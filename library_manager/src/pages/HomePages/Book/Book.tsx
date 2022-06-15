import React, { FC, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import MTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Button, TablePagination, TextField } from '@material-ui/core'
import { useTypedSelector } from '../../../store'
import {
  addBook,
  clearBookError,
  deleteBook,
  getAllBooks,
  updateBook
} from '../../../store/book'
import { TBook } from '../../../store/book/types'
import { ModalContext } from '../../../contexts/Modals'
import { Divider } from '../../../components'

export const BookPage: FC = () => {
  const { data, total } = useTypedSelector((state) => state.book)
  const dispatch = useDispatch()
  const { actions: ModalActions } = useContext(ModalContext)
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(5)
  const [customPage, setCustomPage] = useState(1)

  useEffect(() => {
    dispatch(getAllBooks.request({ page: page + 1, limit: limit }))
  }, [page, limit])

  const handleChangePage = (event: any, newPage: number) => {
    console.log('newPage ', newPage)
    setPage(newPage)
    setCustomPage(newPage + 1)
  }

  const handleChangeRowsPerPage = (event: any) => {
    console.log('event.target.value ', event.target.value)
    setLimit(event.target.value)
    setPage(0)
  }

  const onPressEdit = (book: TBook) => {
    dispatch(clearBookError())

    ModalActions.addAction({
      template: 'update',
      defaultValues: book,
      title: 'Редагування',
      onSuccess: (data) => {
        console.log({ ...book, ...data, limit, page: page + 1 })

        dispatch(
          updateBook.request({ ...book, ...data, limit, page: page + 1 })
        )
      }
    })
  }

  const onPressAdd = () => {
    dispatch(clearBookError())
    ModalActions.addAction({
      template: 'add',
      title: 'Створення',
      onSuccess: (data) => {
        console.log({ ...data, limit, page: page + 1 })
        dispatch(addBook.request({ ...data, limit, page: page + 1 }))
      }
    })
  }

  const onPressDelete = (book: TBook) => {
    dispatch(clearBookError())

    ModalActions.addAction({
      template: 'delete',
      defaultValues: book,
      title: 'Видалення',
      onSuccess: (data) => {
        console.log({ book_id: book.book_id, limit, page: page + 1 })

        dispatch(
          deleteBook.request({ book_id: book.book_id, limit, page: page + 1 })
        )
      }
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '80vw',
        height: '100%',
        alignItems: 'center'
      }}
    >
      <h2>Книги</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <h3>Додати книгу</h3>
          <Divider width={10} />
          <Button
            variant="contained"
            style={{ backgroundColor: '#00FF00' }}
            onClick={() => onPressAdd()}
          >
            Add
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <h3>Перейти до сторінки</h3>
          <Divider width={10} />
          <TextField
            type="number"
            value={customPage}
            onChange={(e) =>
              +e.target.value > 0 && setCustomPage(+e.target.value)
            }
          />
          <Divider width={10} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPage(customPage - 1)}
          >
            Перейти
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <MTable size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Назва книги</TableCell>
              <TableCell align="left">Автор</TableCell>
              <TableCell align="left">Рік</TableCell>
              <TableCell align="left">Кількість копій</TableCell>
              <TableCell align="left">Операції</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((book) => (
              <TableRow key={book.book_id}>
                <TableCell align="left">{book.name}</TableCell>
                <TableCell align="left">{book.author}</TableCell>
                <TableCell align="left">{book.year}</TableCell>
                <TableCell align="left">{book.count}</TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onPressEdit(book)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onPressDelete(book)}
                  >
                    Del
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MTable>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15].filter((v) => v <= total)}
          component="div"
          count={total}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  )
}
