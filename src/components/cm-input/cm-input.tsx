import { Component, Prop, AttachInternals, State, h, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'cm-input',
  styleUrl: 'cm-input.css',
  shadow: true,
  formAssociated: true,
})
export class CmInput {
  @AttachInternals() internals: ElementInternals;
  @Prop() value: string[];
  @Prop() name: string;
  @Prop() label: string;
  @Event() valueChange: EventEmitter<string[]>;
  @State() internalValue: string = '';

  @Watch('value')
  updateInternalValue() {
    const [value] = this.value || [];
    this.internalValue = value || '';
  }

  connectedCallback() {
    this.updateInternalValue();
  }

  handleValueChange(event) {
    const value = event.target.value;
    this.internalValue = value;
    this.valueChange.emit(value ? [value] : null);
  }

  render() {
    return (
      <div>
        <label htmlFor={this.name}>{this.label}</label>

        <input
          type="text"
          id={this.name}
          name={this.name}
          value={this.internalValue}
          onBlur={event => this.handleValueChange(event)}
        />
      </div>
    );
  }
}
