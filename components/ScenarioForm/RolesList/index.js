import React from 'react'
import _ from 'lodash'
import { observer } from 'startupjs'
import { Div, TextInput, Br, Button, Span } from '@startupjs/ui'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

import './index.styl'

const RolesList = observer(({ form, $form, onFormChange, formErrors }) => {
  const handleAddRole = () => $form.set(`roles.${form.roles.length}`, '')
  const handleRemoveRole = index => $form.set('roles', form.roles.filter((r, i) => i !== index))

  return pug`
    Div.root
    for role, index in form.roles
      Div.role(
        key=index
      )
        TextInput.input(
          onChangeText=onFormChange('roles.' + index)
          label=index === 0 ? 'Roles' : ''
          placeholder='Enter role name'
          value=_.get(form, ['roles', index])
        )
        if index > 0
          Button.removeRoleBtn(
            icon=faTrash
            color='error'
            onPress=() => handleRemoveRole(index)
          )
    if formErrors.roles
      Br
      Span.error
        = formErrors.roles
    Button.addRoleBtn(
      variant='text'
      color='primary'
      icon=faPlus
      onPress=handleAddRole
    ) Add role
  `
})

export default RolesList
