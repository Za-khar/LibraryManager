import React, { FC, useEffect, useState } from 'react'
import { TextField, Button, Link } from '@material-ui/core'
import { AuthFormValues } from './types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthContainer, AuthForm } from './styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormValidation, regFormValidation } from './validation'
import { Divider } from '../../components'
import { useDispatch } from 'react-redux'
import { loginAction, registrationAction } from '../../store/user'
import { useTypedSelector } from '../../store'
import { useHistory } from 'react-router-dom'

export const AuthPage: FC = () => {
  const [stage, setStage] = useState<'login' | 'reg'>('login')
  const dispatch = useDispatch()
  const history = useHistory()
  const { err, token } = useTypedSelector((state) => state.user)
  if (token) {
    history.push('/home')
  }

  const { register, handleSubmit, reset } = useForm<AuthFormValues>({
    resolver: zodResolver(
      stage === 'login' ? loginFormValidation : regFormValidation
    )
  })

  const onSubmit: SubmitHandler<AuthFormValues> = (data: AuthFormValues) => {
    console.log(data)
    history.push('/home')
    if (stage === 'login') dispatch(loginAction.request(data))
    else dispatch(registrationAction.request(data))
  }

  return (
    <AuthContainer>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <h2>{stage === 'login' ? 'Вхід' : 'Реєстрація'}</h2>
        <TextField
          type="email"
          label="Електронна пошта"
          {...register('email')}
        />
        <Divider height={10} />

        <TextField
          required
          type="password"
          label="Пароль"
          {...register('password')}
        />
        <Divider height={10} />

        <TextField
          required
          type={stage === 'login' ? 'hidden' : 'firstName'}
          {...register('firstName')}
          label="Ім'я"
          style={{
            display: stage === 'login' ? 'none' : 'flex'
          }}
        />
        <Divider height={10} />
        <TextField
          required
          type={stage === 'login' ? 'hidden' : 'lastName'}
          label="Прізвище"
          {...register('lastName')}
          style={{
            display: stage === 'login' ? 'none' : 'flex'
          }}
        />
        <Divider height={10} />
        <Button type="submit" variant="contained" color="primary">
          {stage === 'login' ? 'Увійти' : 'Зареєструватися'}
        </Button>
      </AuthForm>
      <p>{err}</p>
      <Link
        onClick={() => {
          setStage(stage === 'login' ? 'reg' : 'login')
          reset()
        }}
      >
        {stage === 'login' ? 'До реєстрації' : 'До входу'}
      </Link>
    </AuthContainer>
  )
}
