import React, { useMemo } from 'react'
import { observer, useValue, useDoc } from 'startupjs'
import _ from 'lodash'
import { Div, Span, Card } from '@startupjs/ui'
import GameResults from 'components/ProfessorGame/GameResults'

import './index.styl'

const GameHistoryListItem = observer(({ user = {}, first, game }) => {
  const { _id, name, professorName, stats, players = [], groups } = game
  const [expand, $expand] = useValue(false)
  const playersHash = useMemo(() => _.keyBy(players, '_id'), [players])
  const userGroup = useMemo(() => groups.find(group => group.players.find(u => u.id === user.id)), [groups])
  const [scenario] = useDoc('gameScenarios', _.get(game, 'scenarioId'))

  const getPlayerName = playerId => players.find(player => player._id === playerId).name

  return pug`
    Card.root(
      styleName=[first && 'first']
      onPress=() => $expand.set(true)
    )
      Div.content
        Div.item
          Span.item__key Game: 
          Span.item__label= name

        Div.item
          Span.item__key Pofessor: 
          Span.item__label= professorName

        each playerId in Object.keys(stats)
          Div.item(
            key=playerId
          )
            Span.item__key #{getPlayerName(playerId)}: 
            Span.item__label #{stats[playerId].totalScore}

      if expand
        Div.expanded
          if user.isProfessor
            GameResults(
              gameId=game._id
              scenario=scenario
              playersHash=playersHash
            )
  `
})

export default GameHistoryListItem
