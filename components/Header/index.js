import React, { useEffect } from 'react'
import { observer, usePage, useSession, emit } from 'startupjs'
import { Row, Button, H1, Avatar } from '@startupjs/ui'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import './index.styl'

const Header = observer(() => {
  const [opened, $opened] = usePage('sidebarOpened')
  const [user] = useSession('user')

  useEffect(() => {
    $opened.set(false)
  }, [])

  return pug`
    Row.root
      Button(color='secondaryText' icon=faBars onPress=() => $opened.set(!opened))
      H1.logo Games Platform
      Row.user
        if user
          Avatar(
            size='s'
          )= user.name
          Button.logout(
            onPress=() => emit('url', '/auth/logout')
          ) Logout

  `
})

export default Header
