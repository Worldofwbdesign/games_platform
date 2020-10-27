import React, { useRef } from 'react'
import { Div, TextInput } from '@startupjs/ui'
import VariablesSelect from './VariablesSelect'

const FormulaInput = ({ value = '', variables = {}, onChangeText }) => {
  const inputRef = useRef(null)

  const handleInsertVariable = variable => {
    onChangeText(`${value} {{${variable}}} `)

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return pug`
    Div.root
      TextInput.input(
        ref=inputRef
        multiline
        resize
        numberOfLines=4
        onChangeText=onChangeText
        label='Formula'
        placeholder='Enter formula text'
        value=value
      )
      VariablesSelect(
        variables=variables
        onSelect=handleInsertVariable
      )
  `
}

export default FormulaInput
