import BaseMessageModel from '@dmapper/chat/model/BaseMessageModel'
import BaseMessagesModel from '@dmapper/chat/model/BaseMessagesModel'
import BaseChatModel from '@dmapper/chat/model/BaseChatModel'
import BaseUserChatMetas from '@dmapper/chat/model/BaseUserChatMetas'
import BaseUserChatMeta from '@dmapper/chat/model/BaseUserChatMeta'
import BaseChatsModel from '@dmapper/chat/model/BaseChatsModel'
import BaseVotesModel from '@dmapper/chat/model/BaseVotesModel'
import BaseVoteModel from '@dmapper/chat/model/BaseVoteModel'

export default function (racer) {
  racer.orm('chats', BaseChatsModel)
  racer.orm('chats.*', BaseChatModel)
  racer.orm('messages.*', BaseMessageModel)
  racer.orm('messages', BaseMessagesModel)
  racer.orm('userChatMetas.*', BaseUserChatMeta)
  racer.orm('userChatMetas', BaseUserChatMetas)
  racer.orm('votes', BaseVotesModel)
  racer.orm('votes.*', BaseVoteModel)
}
