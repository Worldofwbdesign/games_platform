import React, { useEffect } from 'react'
import _ from 'lodash'
import { observer, usePage, useSession, emit, useLocal } from 'startupjs'
import { Row, Button, H1, Avatar } from '@startupjs/ui'
import { faBars, faComments } from '@fortawesome/free-solid-svg-icons'

import './index.styl'

const Header = observer(props => {
  const [sidebarOpened, $sidebarOpened] = usePage('sidebarOpened')
  const [render] = useLocal('$render')
  const [chatOpened, $chatOpened] = usePage('chatSidebarOpened')
  const [user] = useSession('user')

  useEffect(() => {
    $sidebarOpened.set(false)
  }, [])

  return pug`
    Row.root
      Button(
        color='secondaryText'
        icon=faBars
        onPress=() => $sidebarOpened.set(!sidebarOpened)
      )
      H1.logo Games Platform
      Row.user
        if user
          if !user.isProfessor && _.get(render, 'url', '').startsWith('/game/') && render.params.gameId
            Button.chat(
              variant='text'
              color=chatOpened ? 'primary' : 'mainText'
              icon=faComments
              onPress=() => $chatOpened.set(!chatOpened)
            )
          Avatar.avatar(
            size='s'
          )= user.name
          Button.logout(
            onPress=() => emit('url', '/auth/logout')
          ) Logout

  `
})

export default Header
