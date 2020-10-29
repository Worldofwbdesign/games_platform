import React from 'react'
import { observer, useQuery } from 'startupjs'
import { Div, H3 } from '@startupjs/ui'
import GroupAnswersList from 'components/GroupAnswersList'

import './index.styl'

const GameResults = observer(({ game, scenario, playersHash }) => {
  const [rounds] = useQuery('rounds', { gameId: game.id })

  return pug`
    Div.root
      each group, index in game.groups
        Div.group(
          key=index
        )
          H3.title Group #{index + 1}
          GroupAnswersList(
            scenario=scenario
            rounds=rounds
            groupPlayers=group.players
            playersHash=playersHash
          )
        
  `
})

export default GameResults
