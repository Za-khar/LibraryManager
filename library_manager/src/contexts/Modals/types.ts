export type {
  TModalContextActoins,
  TModalAddAction,
  TModalContent,
  TModalContext
}

type TModalContext = {
  modal: TModalContent | null
  modalIsOpen: boolean
  actions: TModalContextActoins
}

type TModalContextActoins = {
  addAction: TModalAddAction
}

type TModalAddAction = (modal: TModalContent) => void

type TModalContent = {
  title?: string | number
  onSuccess?: (data: any) => void
  onCancle?: () => void
  template: TModalTemplates
  modalIsOpen?: boolean
  id?: number
  defaultValues?: {
    book_id?: number
    name?: string
    author?: string
    year?: number
    count?: number
  }
}

type TModalTemplates = 'check' | 'update' | 'delete' | 'add'

export type FormValues = {
  book_id?: number
  name: string
  author: string
  year: number
  count?: number
}
