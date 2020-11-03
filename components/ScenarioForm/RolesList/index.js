import React from 'react'
import { observer } from 'startupjs'
import { Div, TextInput, Br, Button, Span, H6 } from '@startupjs/ui'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

import './index.styl'

const RolesList = observer(({ form, $form, onFormChange, formErrors }) => {
  const roles = form.roles || []
  const handleAdd = () => $form.set(`roles.${roles.length}`, '')
  const handleRemove = index => $form.set('roles', roles.filter((r, i) => i !== index))

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
