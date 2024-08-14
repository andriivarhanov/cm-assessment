import { Component, Prop, State, h } from '@stencil/core';
import type { TQuestions, TRichText } from '../../types';

@Component({
  tag: 'cm-assessment',
  styleUrl: 'cm-assessment',
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

  private goToNextPage() {
    this.activePage++;
  }

  private goToPreviousPage() {
    this.activePage--;
  }

  render() {
    const isFirstPage = this.activePage === 0;
    const isLastPage = Boolean(this.questions?.pages?.length) && this.activePage > this.questions.pages.length;

    return (
      <div>
        {isFirstPage && (
          <cm-rich-text data={this.intro}></cm-rich-text>
        )}
        {isLastPage && (
          <cm-rich-text data={this.resultsIntro}></cm-rich-text>
        )}
        {this.activePage !== 0 && (
          <button type="button" onClick={() => {
            this.goToPreviousPage();
          }}>Back</button>
        )}
        {!isLastPage && (
          <button type="button" onClick={() => {
            this.goToNextPage();
          }}>Next</button>
        )}
      </div>
    );
  }
}
