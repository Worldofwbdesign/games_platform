import React, { useEffect } from 'react'
import _ from 'lodash'
import { observer, useDoc, useSession, useQuery, usePage } from 'startupjs'
import { ScrollView } from 'react-native'
import { Layout, Content, SmartSidebar, H2 } from '@startupjs/ui'
import PlayerGame from 'components/PlayerGame'
import ProfessorGame from 'components/ProfessorGame'
import GroupChat from 'components/PlayerGame/GroupChat'

import './index.styl'

const PGame = observer(props => {
  const { match: { params: { gameId } } } = props
  const [userId] = useSession('userId')
  const [user] = useSession('user')
  const [, $chatOpened] = usePage('chatSidebarOpened')
  const [game, $game] = useDoc('games', gameId)
  const [scenario] = useDoc('gameScenarios', _.get(game, 'scenarioId'))
  const gamePlayerIds = _.get(game, 'players', []).map(p => p.id)
  const [players] = useQuery('users', { _id: { $in: gamePlayerIds } })
  const playersHash = _.keyBy(players, 'id')

  useEffect(() => {
    $chatOpened.set(false)
  }, [])

  const renderSidebar = () => {
    return pug`
      GroupChat(
        userId=userId
        groups=game.groups
      )
    `
  }

  if (!game || (!user.isProfessor && !gamePlayerIds.includes(userId))) {
    return pug`
      H2.h2 Game not found!
    `
  }

  if (!scenario) {
    return pug`
      H2.h2 Scenario for game not found!
    `
  }

  return pug`
    Layout
      SmartSidebar(
        position='right'
        path=$chatOpened.path()
        renderContent=renderSidebar
      )
        ScrollView.root
          Content
            H2.h2= game.name
            if user.isProfessor
              ProfessorGame(
                userId=userId
                game=game
                $game=$game
                scenario=scenario
                playersHash=playersHash
              )
            else 
              PlayerGame(
                userId=userId
                game=game
                $game=$game
                scenario=scenario
                playersHash=playersHash
              )
  `
})

export default PGame
