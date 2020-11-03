import React, { useMemo } from 'react'
import { observer, useValue, useDoc } from 'startupjs'
import _ from 'lodash'
import { Div, Span, Card } from '@startupjs/ui'
import GameResults from 'components/ProfessorGame/GameResults'
import GroupAnswersList from 'components/PlayerGame/GroupAnswersList'
import { formatDate } from 'components/helpers'

import './index.styl'

const GameHistoryListItem = observer(({ user = {}, first, game }) => {
  const { _id, name, players = [], groups, startedAt, finishedAt, _m: { ctime } } = game
  const [expand, $expand] = useValue(false)
  const playersHash = useMemo(() => _.keyBy(players, '_id'), [players])
  const userGroup = useMemo(() => groups.find(group => group.players.find(u => u.id === user.id)), [groups])
  const [scenario] = useDoc('gameScenarios', _.get(game, 'scenarioId'))

  return pug`
    Card.root(
      styleName=[first && 'first']
      onPress=() => $expand.set(!expand)
    )
      Div.content
        Div.item
          Span.item__key Game: 
          Span.item__label= name

        Div.item
          Span.item__key Created: 
          Span.item__label= formatDate(ctime)

        Div.item
          Span.item__key Started: 
          Span.item__label= formatDate(startedAt)

        Div.item
          Span.item__key Finished: 
          Span.item__label= formatDate(finishedAt)

      if expand
        Div.expanded
          if user.isProfessor
            GameResults(
              gameId=_id
              scenario=scenario
              playersHash=playersHash
            )
          else
            GroupAnswersList(
              scenario=scenario
              group=userGroup
              playersHash=playersHash
            )
  `
})

export default GameHistoryListItem
