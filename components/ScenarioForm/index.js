import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { model, observer, usePage, emit, useDoc } from 'startupjs'
import { ActivityIndicator } from 'react-native'
import { Div, TextInput, Checkbox, Br, Hr, Button, Span } from '@startupjs/ui'
import TextInputWithError from '../TextInputWithError'
import RolesList from './RolesList'
import QuestionsList from './QuestionsList'

import './index.styl'

const formRegexps = {
  maxRounds: {
    re: /^\d+$/,
    error: 'Should be a positive number'
  },
  validationRegex: {
    func: str => {
      try {
        const regex = new RegExp(str)
        regex.test('test')
        return true
      } catch (err) {
        console.error(err)
      }
    }
  },
  roles: {
    func: roles => roles.every(role => !!role),
    error: 'Fill all roles or delete empty'
  },
  questions: {
    func: questions => questions.every(role => !!role.text),
    error: 'Fill all questions or delete empty'
  }
}

const DEFAULT_QUESTION = {
  text: '',
  options: [],
  variables: []
}

export const DEFAULT_VALUES = {
  maxRounds: '1',
  roles: [''],
  questions: [DEFAULT_QUESTION]
}

const ScenarioForm = observer(({ scenarioId }) => {
  const [formErrors, setFormErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [form = DEFAULT_VALUES, $form] = usePage('form')
  const [editingScenario] = useDoc('gameScenarios', scenarioId)

  useEffect(() => {
    if (scenarioId !== 'new' && editingScenario) {
      $form.setEach(_.omit(editingScenario, 'id'))
    }
  }, [editingScenario])

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
        onChangeText=onFormChange('maxRounds')
        error=formErrors.rounds
        label='Rounds'
        name='rounds'
        placeholder='Enter scenario rounds'
        value=form.maxRounds
      )

      Br
      Checkbox(
        label='Need validation input?'
        value=!!form.withValidation
        onChange=onFormChange('withValidation')
      )

      if form.withValidation
        Br
        TextInputWithError.input(
          onChangeText=onFormChange('validationRegex')
          error=formErrors.validationRegex
          label='Validation regex'
          name='validationRegex'
          placeholder='Enter validation regex'
          value=form.validationRegex
        )

      Br
      Hr

      RolesList(
        form=form
        $form=$form
        onFormChange=onFormChange
        formErrors=formErrors
      )

      QuestionsList(
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
