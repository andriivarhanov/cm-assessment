import { Component, Prop, h } from '@stencil/core';
import { tagByNodeType } from '../../utils/utils';
import type { TRichText } from '../../types';

@Component({
  tag: 'cm-rich-text',
  styleUrl: 'cm-rich-text.css',
  shadow: true,
})
export class CmRichTextComponent {
  @Prop() content: TRichText;

  render() {
    return (
      <div>
        {this.content?.map(item => {
          return (
            <div>
              {item.content
                ?.map(content => {
                  const Tag = tagByNodeType[item.nodeType];

                  if (!Tag) {
                    return null;
                  }

                  return <Tag>{content.value}</Tag>;
                })
                .filter(Boolean)}
            </div>
          );
        })}
      </div>
    );
  }
}
