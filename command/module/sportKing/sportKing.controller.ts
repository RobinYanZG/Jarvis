import { Context } from 'koa'

import User from './User.DTO'
import Record from './Record.DTO'
import { translate, getNumberFromString } from './utils'
import Message from './Message'
import { createUserIfNotExist, saveRecord } from './sportKing.service'

const TAG = '打卡'

const sportKing = async (ctx: Context): Promise<undefined> => {
  const { body } = ctx.request

  const message = new Message(body)

  if (!message.isDirect || !message.pureContent.startsWith(TAG)) {
    return
  }

  const { nickname, mid } = body
  const time = getNumberFromString(message.pureContent)
  const record = new Record(time, mid)

  const user = new User(mid, translate(nickname))

  await saveRecord(record)

  ctx.body = {
    rs: 1,
    tip: `${user.username}打卡${time}分钟，成功录入`, // @人有问题
    end: 0
  }

  createUserIfNotExist(user)
}

export default sportKing
