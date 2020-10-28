import React from 'react'
import _ from 'lodash'
import { observer, usePage } from 'startupjs'
import { Div, TextInput, Button } from '@startupjs/ui'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

import './index.styl'

const ConstantsList = observer(({ questionKey }) => {
  const [question, $question] = usePage(`form.${questionKey}`)
  const constants = _.get(question, 'constants', [])

  const handleAdd = () => {
    $question.set(`constants.${constants.length}`, { key: '', value: '' })
  }
  const handleRemove = index => $question.set('constants', constants.filter((r, i) => i !== index))

  const onChangeText = (index, key) => text => $question.set(`constants.${index}.${key}`, text)

  return pug`
    Div.root
      for constant, index in constants
        Div.constant(
          key=index
          styleName=[index ===0 && 'first']
        )
          TextInput.input(
            onChangeText=onChangeText(index, 'key')
            placeholder='Enter constant key'
            value=constant.key
          )

          TextInput.input.input--value(
            onChangeText=onChangeText(index, 'value')
            placeholder='Enter variable value'
            value=constant.value
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
      ) Add constant
  `
})

export default ConstantsList
