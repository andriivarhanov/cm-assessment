import { Component, Prop, State, h } from '@stencil/core';
import type { TQuestions } from '../../types';

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

  @Prop() intro: string

  @State() activePage: number = 1;

  private goToNextPage() {
    this.activePage++;
  }

  private goToPreviousPage() {
    this.activePage--;
  }

  render() {
    return (
      <div>
        <h1>{this.name}</h1>
        <div>{this.slug}</div>
        <div>{this.activePage}</div>
        {this.activePage !== 1 && (
          <button type="button" onClick={() => {
            this.goToPreviousPage();
          }}>Back</button>
        )}
        <button type="button" onClick={() => {
          this.goToNextPage();
        }}>Next</button>
      </div>
    );
  }
}
