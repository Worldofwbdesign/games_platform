import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { BASE_URL } from '@env'
import { ActivityIndicator, Platform } from 'react-native'
import { Div, Span, Br } from '@startupjs/ui'
import { observer, useValue, emit } from 'startupjs'
import {
  Button,
  TextInput
} from '@dmapper/auth/client/components'
import { formRegexps } from '@dmapper/auth/client/constants'
import withLocalAuth from '@dmapper/auth/client/withLocalAuth'
import './index.styl'

const isWeb = Platform.OS === 'web'

const _RegisterForm = observer(function ({
  onSuccess,
  register,
  login
}) {
  const [form, $form] = useValue({
    name: null,
    email: null,
    password: null,
    confirm: null
  })

  const [formErrors, setFormErrors] = useState({})

  const [loading, setLoading] = useState(false)

  const onFormChange = field => value => {
    $form.set(field, value)
  }

  const validateFields = () => {
    const errors = {}
    const fields = Object.keys(form)
    let isFormValid = true

    fields.forEach(fieldName => {
      const rules = formRegexps[fieldName]
      let error

      if (fieldName === 'confirm') {
        if (form[fieldName] !== form.password) {
          error = 'Passwords doesn\'t match'
        }
      } else {
        if (rules && !rules.re.test(form[fieldName])) {
          error = rules.error
        }
      }

      if (error) {
        isFormValid = false
      }

      errors[fieldName] = error
    })

    setFormErrors(errors)

    return isFormValid
  }

  const submit = async () => {
    setFormErrors({})

    if (!validateFields()) {
      return
    }

    const formClone = { ...form }
    formClone.userData = {
      firstName: form.name.split(' ').shift(),
      lastName: form.name.split(' ').pop(),
      isProfessor: true
    }
    delete formClone.name

    try {
      setLoading(true)
      await register(formClone)
      const res = await login({ email: form.email, password: form.password })

      if (res.data) {
        emit('url', '/auth/successAuth')
      }
    } catch (error) {
      setFormErrors({ authError: error.response.data.message })
      setLoading(false)
    }
  }

  const renderLocalForm = () => pug`
    Br
    TextInput(
      onChangeText=onFormChange('name')
      error=formErrors.name
      label='Full name'
      name='name'
      placeholder='Enter your full name'
      value=form.name || ''
    )
    Br
    TextInput(
      onChangeText=onFormChange('email')
      error=formErrors.email
      label='Email'
      name='email'
      placeholder='Enter your email'
      value=form.email || ''
    )
    Br
    TextInput(
      onChangeText=onFormChange('password')
      error=formErrors.password
      label='Password'
      name='password'
      placeholder='Enter your password'
      secureTextEntry
      value=form.password || ''
    )
    Br
    TextInput(
      onChangeText=onFormChange('confirm')
      error=formErrors.confirm
      name='confirm'
      placeholder='Confirm your password'
      secureTextEntry
      value=form.confirm || ''
    )
    if loading
      Br
      ActivityIndicator
    if formErrors.authError
      Br
      Span.authError
        = formErrors.authError
    Br
    Button(
      onPress=submit
      text='Sign up'
      variant='flat'
      color='primary'
    )
  `

  function onKeyPress (e) {
    if (e.key === 'Enter') {
      submit()
    }
  }

  function listenKeypress () {
    window.addEventListener('keypress', onKeyPress)
  }

  function unlistenKeypress () {
    window.removeEventListener('keypress', onKeyPress)
  }

  useEffect(() => {
    if (isWeb) {
      listenKeypress()
    }
    return () => {
      if (isWeb) {
        unlistenKeypress()
      }
    }
  }, [])

  return pug`
    Div.root
      Span.text.center-text.header-text Sign up
      Br
      = renderLocalForm()
  `
})

_RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  onSuccess: PropTypes.func
}

function RegisterForm (props) {
  const Form = withLocalAuth(_RegisterForm, { baseUrl: BASE_URL })
  return pug`
    Form(...props)
  `
}

export default observer(RegisterForm)
