import { Component, Prop, h } from '@stencil/core';
import { tagByNodeType } from '../../utils/utils';
import type { TRichText } from '../../types';

@Component({
  tag: 'cm-rich-text',
  styleUrl: 'cm-rich-text.css',
})
export class CmRichText {
  @Prop() data: TRichText;

  render() {
    return (
      <div>
        {this.data?.map((item) => {
          return (
            <div>
              {item.content?.map((content) => {
                const Tag = tagByNodeType[item.nodeType];

                if (!Tag) {
                  return null;
                }

                return (
                  <Tag>{content.value}</Tag>
                );
              }).filter(Boolean)}
            </div>
          );
        })}
      </div>
    );
  }
}
