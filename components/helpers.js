import moment from 'moment'

export function compileTemplate (template, data) {
  return template.replace(/{{([\s\S]+?)}}/g, (match, value) => {
    return data[value.trim()] || match
  })
}

export const formatDate = timestamp => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')

export const professorNamePipeline = [
  {
    $lookup: {
      from: 'users',
      localField: 'pofessorId',
      foreignField: 'id',
      as: 'professorName'
    }
  },
  {
    $set: { professorName: { $arrayElemAt: ['$professorName.name', 0] } }
  }
]

export const gamePlayersPipeline = [
  {
    $lookup: {
      from: 'users',
      localField: 'players',
      foreignField: '_id',
      as: 'players'
    }
  }
]

export const gameScenarioPipeline = [
  {
    $lookup: {
      from: 'gameScenarios',
      localField: 'scenarioId',
      foreignField: '_id',
      as: 'scenario'
    }
  },
  {
    $set: { scenario: { $arrayElemAt: ['$scenario', 0] } }
  }
]
