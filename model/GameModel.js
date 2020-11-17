import { BaseModel } from 'startupjs/orm'

const chooseRole = (roles, currentPlayers = []) => roles[currentPlayers.length] || roles[currentPlayers.length % roles.length]

export default class GameModel extends BaseModel {
  async joinGame ({ userId, gameId, roles }) {
    const $game = this.scope(`games.${gameId}`)
    await this.subscribeAsync($game)
    const game = $game.get()
    await $game.push('players', { id: userId, role: chooseRole(roles, game.players) })
  }
}
