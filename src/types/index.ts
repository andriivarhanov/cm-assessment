type TElementType = 'radiogroup' | 'checkbox' | 'text' | 'boolean'

export type TElement = {
  type: TElementType,
  name: string,
  title: string,
  choices?: string[]
  isRequired?: boolean
  labelTrue?: string
  labelFalse?: string
}

export type TPage = {
  name: string,
  elements: TElement[]
}

export type TQuestions = {
  pages: TPage[]
}

export type TRichTextContent = {
  data: Record<string, unknown>,
  marks: Record<string, unknown>[],
  value: string,
  nodeType: string
}

export type TNodeTypes = 'heading-1' | 'heading-2' | 'heading-3' | 'heading-4' | 'heading-5' | 'heading-6' | 'paragraph'

export type TRichTextItem = {
  data: Record<string, unknown>,
  content: TRichTextContent[],
  nodeType: TNodeTypes
}

export type TRichText = TRichTextItem[]
