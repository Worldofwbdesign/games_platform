import React from 'react'
import { observer, emit } from 'startupjs'
import { ScrollView } from 'react-native'
import { Div, Content, Button, H2 } from '@startupjs/ui'

import './index.styl'

const PGames = observer(() => {
  const handleAdd = () => emit('url', '/createGame')

  return pug`
    ScrollView.root
      Content.content
        Div.header
          H2.h2 Games
          
          Div.actions
            Button.btn(
              color="success"
              onPress=handleAdd
            ) Add Game

            Button.btn(
              onPress=() => emit('url', '/gamesHistory')
            ) Past games
  `
})

export default PGames
