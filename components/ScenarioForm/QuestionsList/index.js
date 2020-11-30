import React from 'react'
import { observer, usePage } from 'startupjs'
import { Div, TextInput, Select, Br, Hr, Button, Span, H5 } from '@startupjs/ui'
import FormulaInput from './FormulaInput'
import OptionsList from './OptionsList'
import ConstantsList from './ConstantsList'
import { DEFAULT_VALUES } from '../'

import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

import './index.styl'

const QuestionsList = observer(() => {
  const [formErrors = {}] = usePage('formErrors')
  const [form = DEFAULT_VALUES, $form] = usePage('form')
  const questions = form.questions || []

  const onFormChange = field => value => {
    $form.set(field, value)
  }

  const handleAdd = () => $form.set(`questions.${questions.length}`, { text: '', options: [] })

  const handleRemove = index => $form.set('questions', questions.filter((r, i) => i !== index))

  return pug`
    Div.root
      H5 Questions
      for question, index in questions
        Div.question(
          key=index
        )
          - const questionKey = 'questions.' + index
          Span.label Question #{index + 1}
          Div.inputWrapp
            TextInput.input(
              onChangeText=onFormChange(questionKey + '.text')
              placeholder='Enter question text'
              value=question.text
            )
            if index > 0
              Button.removeBtn(
                icon=faTrash
                color='error'
                onPress=() => handleRemove(index)
              )
          Div.meta
            Select.meta__item(
              label='For role'
              value=question.role
              onChange=onFormChange(questionKey + '.role')
              options=form.roles
            )

            Br
            Span.label Answer options
            OptionsList(
              questionKey=questionKey
            )

            Br
            Span.label Constants
            ConstantsList(
              questionKey=questionKey
            )

            Br
            FormulaInput(
              value=question.formula
              onChangeText=onFormChange(questionKey + '.formula')
              constants=question.constants
              roles=form.roles
            )
        Br
        Hr
              
      if formErrors.questions
        Br
        Span.error
          = formErrors.questions
      Button.addBtn(
        variant='text'
        color='primary'
        icon=faPlus
        onPress=handleAdd
      ) Add question
  `
})

export default QuestionsList
