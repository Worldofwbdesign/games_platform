import React from 'react'
import { Div, TextInput } from '@startupjs/ui'

const FormulaInput = ({ value, onChange }) => {
  const handleChange = text => {
    onChange(text)
  }

  return pug`
    Div.root
      TextInput.input(
        onChangeText=handleChange
        label='Formula'
        placeholder='Enter formula text'
        value=value
      )
  `
}

export default FormulaInput
