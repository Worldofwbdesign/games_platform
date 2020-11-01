import React from 'react'
import { observer, useQuery, useValue } from 'startupjs'
import { Div, H4, Pagination } from '@startupjs/ui'
import PlayerAnswersList from 'components/PlayerAnswersList'
import { PAGE_SIZE } from 'components/constants'

import './index.styl'

const GameResults = observer(({ gameId, scenario, playersHash }) => {
  const [page, $page] = useValue(0)
  const [[{ rounds = [], totalCount } = {}] = []] = useQuery('rounds',
    {
      $aggregate: [
        { $match: { gameId } },
        {
          $facet: {
            rounds: [{ $skip: page * PAGE_SIZE }, { $limit: PAGE_SIZE }],
            totalCount: [{ $count: 'count' }]
          }
        }
      ]
    }
  )

  return pug`
    Div.root
      each round in rounds
        Div.round(
          key=round._id
        )
          H4.title Round #{round.round}
          each userId in Object.keys(round.stats)
            - const userStats = round.stats[userId]
            - const playerQuestions = scenario.questions.filter(q => !q.role || q.role === userStats.role)
            PlayerAnswersList(
              key=userId
              questions=playerQuestions
              playerName=playersHash[userId].name
              ...userStats
            )


      Div.pagination
        Pagination(
          variant="compact"
          page=page
          pages=Math.ceil(_.get(totalCount, '0.count', 0) / PAGE_SIZE)
          onChangePage=newPage => $page.set(newPage)
        )
          
        
  `
})

export default GameResults
