import { Component, Prop, State, Listen, h } from '@stencil/core';
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

  @State() answers: Record<string, string[]> = {};

  connectedCallback() {
    this.answers =
      this.questions?.pages.reduce((acc, page) => {
        page.elements.forEach(item => {
          acc[item.name] = null;
        });

        return acc;
      }, {}) || {};
  }

  private goToNextPage() {
    this.activePage++;
  }

  private goToPreviousPage() {
    this.activePage--;
  }

  @Listen('valueChange', { capture: true })
  setAnswers(name, value) {
    this.answers[name] = value;
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
                    <cm-radio-group
                      options={item.choices}
                      label={item.title}
                      name={item.name}
                      value={this.answers[item.name]}
                      onValueChange={event => {
                        this.setAnswers(item.name, event.detail);
                      }}
                    ></cm-radio-group>
                  )}
                  {item.type === 'checkbox' && (
                    <cm-checkbox-group
                      options={item.choices}
                      label={item.title}
                      name={item.name}
                      value={this.answers[item.name]}
                      onValueChange={event => {
                        this.setAnswers(item.name, event.detail);
                      }}
                    ></cm-checkbox-group>
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
