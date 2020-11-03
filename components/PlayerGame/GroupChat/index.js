import React, { useMemo } from 'react'
import _ from 'lodash'
import { observer, useQuery } from 'startupjs'
import { Div, H5 } from '@startupjs/ui'
import { Chat } from '@dmapper/chat'

import './index.styl'

const GroupChat = observer(({ userId, groups }) => {
  const userGroup = useMemo(() => groups.find(group => group.players.find(user => user.id === userId)), [groups])
  const groupId = userGroup && userGroup.id
  const [chats] = useQuery('chats', { groupId })
  const chatId = _.get(chats, ['0', 'id'])

  return pug`
    Div.root
      if !groups || !groups.length || !chatId
        H5.title Waiting to start the game!
      else
        Chat(
          chatId=chatId
        )
  `
})

export default GroupChat
