import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import MTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Button, TablePagination } from '@material-ui/core'
import { useTypedSelector } from '../../../store'
import { getHistory } from '../../../store/history'
import { format } from 'date-fns'

export const HistoryPage: FC = () => {
  const { data, total } = useTypedSelector((state) => state.history)
  const dispatch = useDispatch()
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(5)

  useEffect(() => {
    dispatch(getHistory.request({ page: page + 1, limit: limit }))
  }, [page, limit])

  const handleChangePage = (event: any, newPage: number) => {
    console.log('newPage ', newPage)
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    console.log('event.target.value ', event.target.value)
    setLimit(event.target.value)
    setPage(0)
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
      <h2>Історія</h2>
      <TableContainer component={Paper}>
        <MTable size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Назва книги</TableCell>
              <TableCell align="left">Ім'я студента</TableCell>
              <TableCell align="left">Дата отримання</TableCell>
              <TableCell align="left">Дата повернення</TableCell>
              <TableCell align="left">Очікувана дата повернення</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((control) => (
              <TableRow key={control.id}>
                <TableCell align="left">{control.bookName}</TableCell>
                <TableCell align="left">{control.studentName}</TableCell>
                <TableCell align="left">
                  {format(new Date(control.loanedDate), 'dd.MM.yyyy')}
                </TableCell>
                <TableCell align="left">
                  {control?.returnDate
                    ? format(new Date(control.returnDate), 'dd.MM.yyyy')
                    : '-'}
                </TableCell>
                <TableCell align="left">
                  {format(new Date(control.dueDate), 'dd.MM.yyyy')}
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
