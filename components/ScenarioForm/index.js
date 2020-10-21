import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { model, observer, usePage, emit, useDoc } from 'startupjs'
import { ActivityIndicator } from 'react-native'
import { Div, TextInput, Br, Hr, Button, Span } from '@startupjs/ui'
import TextInputWithError from '../TextInputWithError'
import RolesList from './RolesList'

import './index.styl'

const formRegexps = {
  rounds: {
    re: /^\d+$/,
    error: 'Should be a positive number'
  },
  roles: {
    func: roles => roles.every(role => !!role),
    error: 'Fill all roles or delete empty'
  }
}

export const DEFAULT_VALUES = {
  name: null,
  description: null,
  rounds: '1',
  roles: ['']
}

const ScenarioForm = observer(({ scenarioId }) => {
  const [formErrors, setFormErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [form = DEFAULT_VALUES, $form] = usePage('form')
  const [editingScenario] = useDoc('gameScenarios', scenarioId)

  useEffect(() => {
    if (scenarioId !== 'new' && editingScenario) {
      $form.set(_.omit(editingScenario, 'id'))
    }
  }, [editingScenario])

  const onFormChange = field => value => {
    console.info('field', field)
    console.info('value', value)
    $form.set(field, value)
  }

  const validateFields = () => {
    const errors = {}
    const fields = Object.keys(form)
    let isFormValid = true

    fields.forEach(fieldName => {
      const rules = formRegexps[fieldName]
      let error

      if (rules) {
        if (
          (rules.re && !rules.re.test(form[fieldName])) ||
          (typeof rules.func === 'function' && !rules.func(form[fieldName]))
        ) {
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

  const handleSubmit = async () => {
    setFormErrors({})

    if (!validateFields()) {
      return
    }

    try {
      setLoading(true)
      if (scenarioId === 'new') {
        await model.add('gameScenarios', form)
      } else {
        await model.set(`gameScenarios.${editingScenario.id}`, form)
      }
      setLoading(false)
      emit('url', '/library')
    } catch (error) {
      setLoading(false)
      setFormErrors({ saveError: error.message })
    }
  }

  return pug`
    Div.root
      TextInput.input(
        onChangeText=onFormChange('name')
        label='Name'
        name='name'
        placeholder='Enter scenario name'
        value=form.name || ''
      )
      Br
      TextInput.input(
        onChangeText=onFormChange('description')
        label='Description'
        name='description'
        placeholder='Enter scenario description'
        value=form.description || ''
      )
      Br
      TextInputWithError.input(
        onChangeText=onFormChange('rounds')
        error=formErrors.rounds
        label='Rounds'
        name='rounds'
        placeholder='Enter scenario rounds'
        value=form.rounds
      )

      Br
      Hr

      RolesList(
        form=form
        $form=$form
        onFormChange=onFormChange
        formErrors=formErrors
      )

      if formErrors.saveError
        Br
        Span.error
          = formErrors.saveError

      if loading
        Br
        ActivityIndicator

      Br
      Button(
        onPress=handleSubmit
        variant='flat'
        color='primary'
      ) Save
  `
})

export default ScenarioForm
