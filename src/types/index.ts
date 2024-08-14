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
