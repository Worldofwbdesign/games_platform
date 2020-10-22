import React from 'react'
import { Div, Span, Button } from '@startupjs/ui'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const OptionsList = ({ $form, options = {}, onChange }) => {
  const handleAdd = () => $form.set(`options.${options.length}`, '')
  const handleRemove = index => $form.set('options', options.filter((r, i) => i !== index))

  return pug`
    Div.root
      for option, index in options
        Div.option
          Span.text
          Button.removeBtn(
            icon=faTrash
            color='error'
            onPress=() => handleRemove(index)
          )

      Button.addBtn(
        variant='text'
        color='primary'
        icon=faPlus
        onPress=handleAdd
      ) Add variable
  `
}

export default OptionsList
