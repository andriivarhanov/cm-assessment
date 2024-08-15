# my-component



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute | Description                                  | Type                  | Default     |
| -------------- | --------- | -------------------------------------------- | --------------------- | ----------- |
| `intro`        | --        | Rich text introduction to the assessment     | `TRichTextItem[]`     | `undefined` |
| `name`         | `name`    | The name of the assessment                   | `string`              | `undefined` |
| `questions`    | --        | Data containing the assessment questions     | `{ pages: TPage[]; }` | `undefined` |
| `resultsIntro` | --        | Rich text introduction for the results page  | `TRichTextItem[]`     | `undefined` |
| `slug`         | `slug`    | A URL-friendly identifier for the assessment | `string`              | `undefined` |


## Events

| Event                 | Description | Type                                      |
| --------------------- | ----------- | ----------------------------------------- |
| `assessmentCompleted` |             | `CustomEvent<{ [x: string]: string[]; }>` |


## Dependencies

### Depends on

- [cm-rich-text](../cm-rich-text)
- [cm-radio-group](../cm-radio-group)
- [cm-checkbox-group](../cm-checkbox-group)
- [cm-input](../cm-input)

### Graph
```mermaid
graph TD;
  cm-assessment --> cm-rich-text
  cm-assessment --> cm-radio-group
  cm-assessment --> cm-checkbox-group
  cm-assessment --> cm-input
  style cm-assessment fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
