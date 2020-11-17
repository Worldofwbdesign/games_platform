import React from 'react'
import _ from 'lodash'
import { observer, useQuery, useValue, useSession } from 'startupjs'
import { Div, Pagination } from '@startupjs/ui'
import GameListItem from '../GameListItem'
import { professorNamePipeline, gameScenarioPipeline } from '../helpers'
import { PAGE_SIZE } from '../constants'

import './index.styl'

const PlayerGames = observer(() => {
  const [userId] = useSession('userId')
  const [page, $page] = useValue(0)
  const [[{ games = [], totalCount } = {}] = []] = useQuery('games',
    {
      $aggregate: [
        {
          $match: {
            $or: [
              { status: { $nin: ['started', 'finished'] } },
              { 'players.id': userId, status: 'started' }
            ]
          }
        },
        {
          $facet: {
            games: [{ $skip: page * PAGE_SIZE }, { $limit: PAGE_SIZE }, ...professorNamePipeline, ...gameScenarioPipeline],
            totalCount: [{ $count: 'count' }]
          }
        }
      ]
    }
  )

  return pug`
    Div.root
      Div.games
        for game, index in games
          GameListItem(
            key=game._id
            first=index === 0
            game=game
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

export default PlayerGames
