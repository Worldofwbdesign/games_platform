import React, { useState, useEffect, useMemo } from 'react'
import { model, observer } from 'startupjs'
import { Div, Loader, H5 } from '@startupjs/ui'
import { Chat } from '@dmapper/chat'

import './index.styl'

const GroupChat = observer(({ userId, groups }) => {
  const userGroup = useMemo(() => groups.find(group => group.players.find(user => user.id === userId)), [groups])
  const groupId = userGroup.id
  const [chatId, setChatId] = useState('')
  const [loading, setLoading] = useState(false)

  const addChat = async () => {
    setLoading(true)
    const $chat = model.query('chats', { groupId })
    await model.fetch($chat)
    const chat = $chat.get()[0]
    model.unfetch($chat)

    if (chat) {
      setChatId(chat.id)
    } else {
      const id = await model.scope('chats').addNew('private', { groupId, userIds: userGroup.players.map(p => p.id) })
      setChatId(id)
    }
    setLoading(false)
  }

  useEffect(() => {
    addChat()
  }, [groups, userId])

  return pug`
    Div.root
      if !groups || !groups.length
        H5.title Waiting to start the game!
      else if loading
        Loader
      else
        Chat(
          chatId=chatId
        )
  `
})

export default GroupChat
