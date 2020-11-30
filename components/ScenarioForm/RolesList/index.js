import React from 'react'
import { observer, usePage } from 'startupjs'
import { Div, TextInput, Br, Button, Span, H6 } from '@startupjs/ui'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { DEFAULT_VALUES } from '../'

import './index.styl'

const RolesList = observer(() => {
  const [formErrors = {}] = usePage('formErrors')
  const [form = DEFAULT_VALUES, $form] = usePage('form')

  const roles = form.roles || []
  const handleAdd = () => $form.set(`roles.${roles.length}`, '')
  const handleRemove = index => $form.set('roles', roles.filter((r, i) => i !== index))

  const onFormChange = field => value => {
    $form.set(field, value)
  }

  return pug`
    Div.root
      H6 Roles
      for role, index in roles
        Div.role(
          key=index
        )
          TextInput.input(
            onChangeText=onFormChange('roles.' + index)
            placeholder='Enter role name'
            value=role
          )
          if index > 0
            Button.removeBtn(
              icon=faTrash
              color='error'
              onPress=() => handleRemove(index)
            )
      if formErrors.roles
        Br
        Span.error
          = formErrors.roles
      Button.addBtn(
        variant='text'
        color='primary'
        icon=faPlus
        onPress=handleAdd
      ) Add role
  `
})

export default RolesList
