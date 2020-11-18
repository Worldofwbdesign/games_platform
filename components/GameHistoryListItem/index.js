import React, { useEffect, useMemo } from 'react'
import { observer, useValue, useDoc, useSession } from 'startupjs'
import _ from 'lodash'
import { Div, Span, Card } from '@startupjs/ui'
import GameResults from 'components/ProfessorGame/GameResults'
import GroupAnswersList from 'components/PlayerGame/GroupAnswersList'
import { formatDate } from 'components/helpers'

import './index.styl'

const GameHistoryListItem = observer(({ first, game }) => {
  const [user] = useSession('user')
  const [playersById, $playersById] = useSession(`playersById.${game._id}`)
  const { _id, name, players = [], groups, startedAt, finishedAt, _m: { ctime } } = game
  const [expand, $expand] = useValue(false)
  const userGroup = useMemo(() => groups.find(group => group.players.find(u => u.id === user.id)), [groups])
  const [scenario] = useDoc('gameScenarios', _.get(game, 'scenarioId'))

  useEffect(() => {
    $playersById.set(_.keyBy(players, '_id'))
  }, [players])

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
            )
          else
            GroupAnswersList(
              scenario=scenario
              group=userGroup
              playersById=playersById
            )
  `
})

export default GameHistoryListItem
