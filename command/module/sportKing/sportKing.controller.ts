import { Context } from 'koa'

import Person from './Person.DTO'
import { translate, getNumberFromString } from './utils'
import Message from './Message.DTO'

const TAG = '打卡'

const sportKing = (ctx: Context): void => {
  const { body } = ctx.request

  const message = new Message(body)

  if (!message.isDirect || !message.pureContent.startsWith(TAG)) {
    return
  }

  const { nickname, mid } = body
  const person = new Person({
    name: translate(nickname),
    id: mid,
    t: getNumberFromString(message.pureContent)
  })

  ctx.body = {
    rs: 1,
    tip: `${person.nickName}打卡${person.time}分钟，成功录入`, // @人有问题
    end: 0
  }
}

export default sportKing
