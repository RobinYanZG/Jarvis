import { Context, Next } from 'koa'

import User from './User.DTO'
import Record from './Record.DTO'
import { translate, getNumberFromString } from './utils'
import Message from './Message'
import { createUserIfNotExist, saveRecord, getRecordsByDay, getUserAndCreateIfNotExist } from './sportKing.service'

const TAG = '打卡'

export const sportKing = async (ctx: Context, next: Next): Promise<undefined> => {
  const { body } = ctx.request

  const message = new Message(body)

  if (!message.isDirect || !message.pureContent.startsWith(TAG)) {
    return next()
  }

  const { nickname, mid } = body
  const tempUser = new User(mid, translate(nickname))
  const user = await getUserAndCreateIfNotExist(tempUser);

  const time = getNumberFromString(message.pureContent)
  const record = new Record(time, user.id)

  await saveRecord(record)

  ctx.body = {
    rs: 1,
    tip: `${user.username}打卡${time}分钟，成功录入`, // @人有问题
    end: 0
  }

  return;
}

export const cutoff = async (ctx: Context, next: Next): Promise<undefined> => {
  const { body } = ctx.request

  const message = new Message(body)

  if (!message.isDirect || message.pureContent !== '昨日结算') {
    return next()
  }

  const record = await getRecordsByDay();
  let str = '昨日打卡总结：\n'
  record.map(r => {
    if(!r.user) return;
    str += `${r.user.username}: ${r._sumTime}分钟 \n`
  })

  ctx.body = {
    rs: 1,
    tip: str,
    end: 0
  }

  return ;
}

export default sportKing
