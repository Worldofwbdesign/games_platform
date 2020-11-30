import { BaseModel } from 'startupjs/orm'

export default class RoundsModel extends BaseModel {
  add (round) {
    this.root.add({
      ...round,
      stats: {}
    })
  }

  clearUserStats (userId) {
    return this.del(`stats.${userId}.answers`)
  }
}
