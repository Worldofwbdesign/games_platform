import React from 'react'
import { observer, usePage } from 'startupjs'
import { Div, TextInput, Button } from '@startupjs/ui'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

import './index.styl'

const OptionsList = observer(({ questionKey }) => {
  const [question, $question] = usePage(`form.${questionKey}`)
  const options = question ? question.options : []

  const handleAdd = () => {
    $question.set(`options.${options.length}`, '')
  }
  const handleRemove = index => $question.set('options', options.filter((r, i) => i !== index))

  const onChangeText = index => text => $question.set(`options.${index}`, text)

  return pug`
    Div.root
      for option, index in options
        Div.option(
          key=index
          styleName=[index ===0 && 'first']
        )
          TextInput.input(
            onChangeText=onChangeText(index)
            placeholder='Enter answer option'
            value=option
          )
          Button.removeBtn(
            variant='text'
            icon=faTrash
            color='error'
            onPress=() => handleRemove(index)
          )

      Button.addBtn(
        size='s'
        variant='text'
        color='primary'
        icon=faPlus
        onPress=handleAdd
      ) Add option
  `
})

export default OptionsList
