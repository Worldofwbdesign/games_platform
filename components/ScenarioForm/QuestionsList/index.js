import React from 'react'
import { observer } from 'startupjs'
import { Div, TextInput, Select, Br, Button, Span, H5 } from '@startupjs/ui'
import FormulaInput from './FormulaInput'

import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

import './index.styl'

const QuestionsList = observer(({ form, $form, onFormChange, formErrors }) => {
  const questions = form.questions || []

  const handleAdd = () => $form.set(`questions.${questions.length}`, { text: '' })

  const handleRemove = index => $form.set('questions', questions.filter((r, i) => i !== index))

  console.info('questions', questions)

  return pug`
    Div.root
      H5 Questions
      for question, index in questions
        Div.question(
          key=index
        )
          Span.label Question #{index + 1}
          Div.inputWrapp
            TextInput.input(
              onChangeText=onFormChange('questions.' + index + '.text')
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
              onChange=onFormChange('questions.' + index + '.role')
              options=form.roles
            )
            Br
            FormulaInput(
              value=question.formula
              onChange=onFormChange('questions.' + index + '.formula')
            )
              
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
