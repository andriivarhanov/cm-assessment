import { Component, Prop, AttachInternals, h, Event, EventEmitter } from '@stencil/core';
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

  handleValueChange(event) {
    const value = event.target.value;
    this.valueChange.emit([value]);
  }

  render() {
    return (
      <fieldset>
        {this.label && <legend>{this.label}</legend>}

        {this.options?.map(item => {
          const id = `${this.name}-${slugify(item)}`;

          return (
            <div>
              <input type="checkbox" id={id} name={this.name} value={item} onChange={event => this.handleValueChange(event)} checked={(this.value || [])?.includes(item)} />
              <label htmlFor={id}>{item}</label>
            </div>
          );
        })}
      </fieldset>
    );
  }
}
