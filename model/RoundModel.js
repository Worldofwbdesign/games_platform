import { BaseModel } from 'startupjs/orm'

export default class RoundModel extends BaseModel {
  async clearRoundStats (userId) {
    await this.root.del(`stats.${userId}.answers`)
  }
}
