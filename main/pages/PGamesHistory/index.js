import React from 'react'
import { observer, useSession, useQuery } from 'startupjs'
import { ScrollView } from 'react-native'
import { Div, Content, H2 } from '@startupjs/ui'
import GameHistoryListItem from 'components/GameHistoryListItem'
import { professorNamePipeline, gamePlayersPipeline } from 'components/helpers'

import './index.styl'

const PGamesHistory = observer(() => {
  const [user] = useSession('user')
  const [games] = useQuery('games', {
    $aggregate: [
      { $match: { [user.isProfessor ? 'professorId' : 'players.id']: user.id, status: 'finished' } },
      ...professorNamePipeline,
      ...gamePlayersPipeline
    ]
  })

  return pug`
    ScrollView.root
      Content.content
        H2.h2 Past games
        Div.history
        for game, index in games
          GameHistoryListItem(
            key=game._id
            first=index === 0
            game=game
            user=user
          )
  `
})

export default PGamesHistory
