import React from 'react'
import { Div, TextInput, Select } from '@startupjs/ui'

import './index.styl'

const PlayerQuestionItem = ({ question, value, onAnswerChange }) => {
  const { options = [] } = question

  const onChange = newValue => {
    onAnswerChange(newValue)
  }

  return pug`
    Div.root 
      if options.length > 0
        Select.select(
          label=question.text
          placeholder='Enter answer'
          value=value
          onChange=onChange
          options=options
        )
      else
        TextInput.input(
          label=question.text
          placeholder='Enter answer'
          value=value
          onChangeText=onChange
        )
  `
}

export default PlayerQuestionItem
