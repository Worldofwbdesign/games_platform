import React from 'react'
import { Div, TextInput } from '@startupjs/ui'

const FormulaInput = ({ value = '', variables = {}, onChangeText }) => {
  return pug`
    Div.root
      TextInput.input(
        multiline
        resize
        numberOfLines=4
        onChangeText=onChangeText
        label='Formula'
        placeholder='Enter formula text'
        value=value
      )
  `
}

export default FormulaInput
