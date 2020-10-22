import React from 'react'
import { Div, Span, Button } from '@startupjs/ui'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const VariablesList = ({ variables = {}, onChange }) => {
  const handleAdd = () => onChange({ ...variables, [`variable_${Object.keys(variables).length}`]: '' })
  const handleRemove = () => onChange()

  return pug`
    Div.root
      each value, key in variables
        Div.variable
          Div.variable__create
            Span.key= key
            Span.value= value
          Button.removeBtn(
            icon=faTrash
            color='error'
            onPress=() => handleRemove(key)
          )

      Button.addBtn(
        variant='text'
        color='primary'
        icon=faPlus
        onPress=handleAdd
      ) Add variable
  `
}

export default VariablesList
