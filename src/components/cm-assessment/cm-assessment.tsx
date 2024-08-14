import { Component, Prop, State, Watch, h } from '@stencil/core';
import type { TQuestions, TRichText } from '../../types';

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

  @Watch('questions')
  normalizeDataOnLoad() {
    console.log('normalizeDataOnLoad')
    this.answers =
      this.questions?.pages.reduce((acc, page) => {
        page.elements.forEach(item => {
          acc[item.name] = null;
        });

        return acc;
      }, {}) || {};
    this.errors =
      this.questions?.pages.reduce((acc, page) => {
        page.elements.forEach(item => {
          acc[item.name] = true;
        });

        return acc;
      }, {}) || {};
  }

  connectedCallback() {
    this.normalizeDataOnLoad();
  }

  private validatePage(page: number) {
    const pageFields = this.questions?.pages?.[page - 1]?.elements?.map(item => item.name)

    if (!pageFields) {
      return true
    }

    return pageFields.reduce((acc, field) => {
      acc = this.errors[field]
      if (acc) {
        return false
      }
    }, false)
  }

  private goToNextPage() {
    const isValidPage = this.validatePage(this.activePage);

    if (isValidPage) {
      this.showErrors = false;
      this.activePage++;
      return
    }

    this.showErrors = true;
  }

  private goToPreviousPage() {
    this.activePage--;
  }

  private setAnswers(name, value) {
    const answers = {
      ...this.answers,
      [name]: value
    }
    this.answers = answers;

    const errors = {
      ...this.errors,
      [name]: !value,
    };
    this.errors = errors;
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
          <form>
            {currentPage.elements.map(item => {
              return (
                <div>
                  {item.type === 'radiogroup' && (
                    <div>
                      <cm-radio-group
                        options={item.choices}
                        label={item.title}
                        name={item.name}
                        value={this.answers[item.name]}
                        onValueChange={event => {
                          this.setAnswers(item.name, event.detail);
                        }}
                      ></cm-radio-group>
                      {this.errors[item.name] && this.showErrors && <p>Required</p>}
                    </div>
                  )}
                  {item.type === 'checkbox' && (
                    <div>
                      <cm-checkbox-group
                        options={item.choices}
                        label={item.title}
                        name={item.name}
                        value={this.answers[item.name]}
                        onValueChange={event => {
                          this.setAnswers(item.name, event.detail);
                        }}
                      ></cm-checkbox-group>
                      {this.errors[item.name] && this.showErrors && <p>Required</p>}
                    </div>
                  )}
                  {item.type === 'boolean' && (
                    <cm-radio-group
                      options={[item.labelTrue, item.labelFalse]}
                      label={item.title}
                      name={item.name}
                      value={this.answers[item.name]}
                      onValueChange={event => {
                        this.setAnswers(item.name, event.detail);
                      }}
                    ></cm-radio-group>
                  )}
                </div>
              );
            })}
          </form>
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
      </div>
    );
  }
}
