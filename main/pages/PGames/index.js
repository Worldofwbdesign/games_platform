import React from 'react'
import { observer, useSession, emit } from 'startupjs'
import { ScrollView } from 'react-native'
import { Div, Content, Button, H2 } from '@startupjs/ui'
import ProfessorGames from 'components/ProfessorGames'
import PlayerGames from 'components/PlayerGames'

import './index.styl'

const PGames = observer(() => {
  const [user] = useSession('user')

  if (!user) return

  return pug`
    ScrollView.root
      Content.content
        Div.header
          H2.h2 Games
          Button.btn(
            onPress=() => emit('url', '/gamesHistory')
          ) Past games

        if user.isProfessor
          ProfessorGames(
            user=user
          )
        else
          PlayerGames(
            user=user
          )
  `
})

export default PGames
