import React from 'react'
import _ from 'lodash'
import { observer, usePage } from 'startupjs'
import { Div, TextInput, Button } from '@startupjs/ui'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

import './index.styl'

const VariablesList = observer(({ questionKey }) => {
  const [question, $question] = usePage(`form.${questionKey}`)
  const variables = _.get(question, 'variables', [])

  const handleAdd = () => {
    $question.set(`variables.${variables.length}`, { key: '', value: '' })
  }
  const handleRemove = index => $question.set('variables', variables.filter((r, i) => i !== index))

  const onChangeText = (index, key) => text => $question.set(`variables.${index}.${key}`, text)

  return pug`
    Div.root
      for variable, index in variables
        Div.variable(
          key=index
          styleName=[index ===0 && 'first']
        )
          TextInput.input(
            onChangeText=onChangeText(index, 'key')
            placeholder='Enter variable key'
            value=variable.key
          )

          TextInput.input.input--value(
            onChangeText=onChangeText(index, 'value')
            placeholder='Enter variable value'
            value=variable.value
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
      ) Add variable
  `
})

export default VariablesList
