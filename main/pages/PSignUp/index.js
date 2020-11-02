import React from 'react'
import { observer, useValue, emit } from 'startupjs'
import { ScrollView } from 'react-native'
import { Content, Button } from '@startupjs/ui'
import RegisterForm from 'components/RegisterForm'

import './index.styl'

const PSignUp = observer(() => {
  const [registerProfessor, $registerProfessor] = useValue(false)

  return pug`
    ScrollView.root
      Content.content
        if registerProfessor
          RegisterForm

        else
          Button.btn(
            onPress=() => $registerProfessor.set(true)
          ) Register as Professor
          Button.btn(
            color="sucess"
            onPress=() => emit('url', '/auth/sign-in')
          ) Continue
  `
})

export default PSignUp
