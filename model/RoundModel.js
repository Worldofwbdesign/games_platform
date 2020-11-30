import { BaseModel } from 'startupjs/orm'

export default class RoundModel extends BaseModel {
  setStats (stats) {
    this.set('stats', stats)
  }

  clearUserStats (userId) {
    return this.del(`stats.${userId}.answers`)
  }
}
