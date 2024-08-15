import { Component, Prop, State, Watch, h, EventEmitter, Event } from '@stencil/core';
import type { TQuestions, TRichText } from '../../types';
import { mapPagesToObj } from '../../utils/utils';

@Component({
  tag: 'cm-assessment',
  styleUrl: 'cm-assessment.css',
  shadow: true,
})
export class CmAssessmentComponent {
  /**
   * The name of the assessment
   */
  @Prop() name: string;

  /**
   * A URL-friendly identifier for the assessment
   */
  @Prop() slug: string;

  /**
   * Data containing the assessment questions
   */
  @Prop() questions: TQuestions;

  /**
   * Rich text introduction to the assessment
   */
  @Prop() intro: TRichText;

  /**
   * Rich text introduction for the results page
   */
  @Prop() resultsIntro: TRichText;

  @State() activePage: number = 0;

  @State() answers: Record<string, string[] | null> = {};

  @State() errors: Record<string, boolean> = {};

  @State() showErrors: boolean = false;

  @Event() assessmentCompleted: EventEmitter<Record<string, string[]>>;

  @Watch('questions')
  normalizeDataOnLoad() {
    this.answers = mapPagesToObj(this.questions?.pages, null);
    this.errors = mapPagesToObj(this.questions?.pages, true);
  }

  connectedCallback() {
    this.normalizeDataOnLoad();
  }

  private validatePage(page: number) {
    const pageFields = this.questions?.pages?.[page - 1]?.elements?.map(item => item.name);

    if (!pageFields) {
      return true;
    }

    return pageFields.every(field => !this.errors[field]);
  }

  private goToNextPage() {
    const isValidPage = this.validatePage(this.activePage);

    if (isValidPage) {
      this.showErrors = false;
      this.activePage++;
      return;
    }

    this.showErrors = true;
  }

  private goToPreviousPage() {
    this.activePage--;
  }

  private setAnswers(name: string, value: string[] | null) {
    const answers = {
      ...this.answers,
      [name]: value,
    };
    this.answers = answers;

    const errors = {
      ...this.errors,
      [name]: !value,
    };
    this.errors = errors;
  }

  handleSubmit() {
    this.assessmentCompleted.emit(this.answers);
  }

  render() {
    const isFirstPage = this.activePage === 0;
    const isLastPage = Boolean(this.questions?.pages?.length) && this.activePage > this.questions.pages.length;
    const isQuestionPage = !isFirstPage && !isLastPage;
    const currentPage = this.questions?.pages?.[this.activePage - 1];

    return (
      <div>
        {isFirstPage && <cm-rich-text content={this.intro}></cm-rich-text>}
        {isLastPage && <cm-rich-text content={this.resultsIntro}></cm-rich-text>}
        {isQuestionPage && (
          <div>
            {this.name && <h2>{this.name}</h2>}
            <form>
              {currentPage.elements.map(item => {
                return (
                  <div class="mb-2">
                    {item.type === 'radiogroup' && (
                      <div class="mb-2">
                        <cm-radio-group
                          options={item.choices}
                          label={item.title}
                          name={item.name}
                          value={this.answers[item.name]}
                          onValueChange={event => {
                            this.setAnswers(item.name, event.detail);
                          }}
                        ></cm-radio-group>
                        {this.errors[item.name] && this.showErrors && <p class="color-danger text-small">Required</p>}
                      </div>
                    )}
                    {item.type === 'checkbox' && (
                      <div class="mb-2">
                        <cm-checkbox-group
                          options={item.choices}
                          label={item.title}
                          name={item.name}
                          value={this.answers[item.name]}
                          onValueChange={event => {
                            this.setAnswers(item.name, event.detail);
                          }}
                        ></cm-checkbox-group>
                        {this.errors[item.name] && this.showErrors && <p class="color-danger text-small">Required</p>}
                      </div>
                    )}
                    {item.type === 'boolean' && (
                      <div class="mb-2">
                        <cm-radio-group
                          options={[item.labelTrue, item.labelFalse]}
                          label={item.title}
                          name={item.name}
                          value={this.answers[item.name]}
                          onValueChange={event => {
                            this.setAnswers(item.name, event.detail);
                          }}
                        ></cm-radio-group>
                        {this.errors[item.name] && this.showErrors && <p class="color-danger text-small">Required</p>}
                      </div>
                    )}
                    {item.type === 'text' && (
                      <div class="mb-2">
                        <cm-input
                          label={item.title}
                          name={item.name}
                          value={this.answers[item.name]}
                          onValueChange={event => {
                            this.setAnswers(item.name, event.detail);
                          }}
                        ></cm-input>
                        {this.errors[item.name] && this.showErrors && <p class="color-danger text-small">Required</p>}
                      </div>
                    )}
                  </div>
                );
              })}
            </form>
          </div>
        )}
        {isQuestionPage && (
          <button
            type="button"
            onClick={() => {
              this.goToPreviousPage();
            }}
          >
            Back
          </button>
        )}
        {!isLastPage && (
          <button
            type="button"
            onClick={() => {
              this.goToNextPage();
            }}
          >
            Next
          </button>
        )}
        {isLastPage && (
          <button
            type="button"
            onClick={() => {
              this.handleSubmit();
            }}
          >
            Submit
          </button>
        )}
      </div>
    );
  }
}
