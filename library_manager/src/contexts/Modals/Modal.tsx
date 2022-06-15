import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, Button } from '@material-ui/core'
import React, {
  createContext,
  Fragment,
  useCallback,
  useEffect,
  useState
} from 'react'
import ReactDOM from 'react-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import Modal from 'react-modal'
import { Divider } from '../../components'
import { useTypedSelector } from '../../store'
import { Form, FromContainer, ModalContainer } from './styled'
import { TModalContext, FormValues } from './types'
import { addFormValidation, updateFormValidation } from './validation'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

const ModalContext = createContext<TModalContext>({
  modal: null,
  modalIsOpen: false,
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    addAction: (m: TModalContext['modal']) => {}
  }
})

export default ModalContext

export const ModalContextProvider: React.FC<{ children: any }> = ({
  children
}) => {
  const [modal, setModals] = useState<TModalContext['modal']>(null)
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const { err } = useTypedSelector((state) => state.book)

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(
      modal?.template === 'add' ? addFormValidation : updateFormValidation
    ),
    defaultValues: {
      book_id: modal?.defaultValues?.book_id,
      name: modal?.defaultValues?.name,
      author: modal?.defaultValues?.author,
      year: modal?.defaultValues?.year,
      count: modal?.defaultValues?.count
    }
  })

  console.log(errors)

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data)

    console.log(modal?.onSuccess)
    modal?.onSuccess?.(data)
    closeModal()
  }

  const addAction = useCallback(
    (modal: TModalContext['modal']) => {
      reset(modal?.defaultValues ?? {})
      setModals(modal)
      setIsOpen(true)
    },
    [setModals]
  )

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModals(null)
  }

  const onDelete = () => {
    modal?.onSuccess?.({})
    closeModal()
  }

  return (
    <ModalContext.Provider
      value={{
        modal,
        modalIsOpen,
        actions: {
          addAction
        }
      }}
    >
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {!!modal &&
          (modal.template === 'check' ? (
            <ModalContainer>
              <h2>Hello</h2>
              <button onClick={closeModal}>close</button>
              <div>I am a modal</div>
              <form>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button>
              </form>
            </ModalContainer>
          ) : modal.template === 'update' || modal.template === 'add' ? (
            <FromContainer>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <h2>{modal?.title ?? ''}</h2>
                <TextField
                  style={{ width: '80%' }}
                  type="number"
                  label="Ідентифікатор"
                  disabled={modal.template === 'update'}
                  {...register('book_id', {
                    setValueAs: (v) => parseInt(v, 10)
                  })}
                />

                <Divider height={10} />

                <TextField
                  style={{ width: '80%' }}
                  required
                  label="Назва"
                  {...register('name')}
                />
                <Divider height={10} />

                <TextField
                  style={{ width: '80%' }}
                  required
                  {...register('author')}
                  label="Автор"
                />
                <Divider height={10} />
                <TextField
                  style={{ width: '80%' }}
                  type="number"
                  required
                  label="Рік видання"
                  {...register('year', {
                    setValueAs: (v) => parseInt(v, 10)
                  })}
                />
                <TextField
                  style={{ width: '80%' }}
                  required
                  type="number"
                  label="Кількість"
                  disabled={modal.template === 'update'}
                  {...register('count', {
                    setValueAs: (v) => parseInt(v, 10)
                  })}
                />
                <Divider height={20} />
                <Button
                  style={{ width: 200 }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {modal.template === 'add' ? 'Додати' : 'Оновити'}
                </Button>
              </Form>
              <p>{err}</p>
            </FromContainer>
          ) : modal.template === 'delete' ? (
            <FromContainer>
              <h2>{modal?.title ?? ''}</h2>
              <h3>
                {' '}
                Ви впевнені що хочете видалити книгу{' '}
                {modal?.defaultValues?.name ?? ''} ?
              </h3>
              <Divider height={10} />
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Button variant="contained" color="primary" onClick={onDelete}>
                  Видалити
                </Button>
                <Divider width={10} />
                <Button variant="outlined" color="primary" onClick={onDelete}>
                  Відмінити
                </Button>
              </div>
            </FromContainer>
          ) : (
            <></>
          ))}
      </Modal>

      {children}
    </ModalContext.Provider>
  )
}
