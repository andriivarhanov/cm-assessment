import { Component, Prop, AttachInternals, State, h, Event, EventEmitter } from '@stencil/core';
import { slugify } from '../../utils/utils';

@Component({
  tag: 'cm-checkbox-group',
  styleUrl: 'cm-checkbox-group.css',
  shadow: true,
  formAssociated: true,
})
export class CmCheckboxGroup {
  @AttachInternals() internals: ElementInternals;
  @Prop() value: string[];
  @Prop() name: string;
  @Prop() label: string;
  @Prop() options: string[];
  @Event() valueChange: EventEmitter<string[]>;
  @State() internalValue: string[] = [];

  connectedCallback() {
    this.internalValue = this.value || [];
  }

  handleValueChange(event) {
    const eventValue = event.target.value;
    this.internalValue = this.internalValue.includes(eventValue)
      ? this.internalValue.filter(item => item !== eventValue)
      : [...this.internalValue, eventValue];

    this.valueChange.emit(Boolean(this.internalValue.length) ? this.internalValue : null);
  }

  render() {
    return (
      <fieldset>
        {this.label && <legend>{this.label}</legend>}

        {this.options?.map(item => {
          const id = `${this.name}-${slugify(item)}`;

          return (
            <div>
              <input
                type="checkbox"
                id={id}
                name={this.name}
                value={item}
                onChange={event => this.handleValueChange(event)}
                checked={(this.internalValue || [])?.includes(item)}
              />
              <label htmlFor={id}>{item}</label>
            </div>
          );
        })}
      </fieldset>
    );
  }
}
