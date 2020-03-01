import User from './User.DTO'
import Record from './Record.DTO'
import Bb, { Query } from './Bmob'

export const findUserById = async (id: string): Promise<object> => new Promise(resolve => {
  const query = Bb.ins.Query('user')
  query.equalTo('wechatId', '==', id)
  query.find().then(res => {
    resolve(res)
  })
})

export const saveRecord = (r: Record): Promise<object> => new Promise(resolve => {
  const query = Bb.ins.Query('record')
  query.set('time', `${r.time}`)
  query.set('userId', r.userId)

  query.save().then(res => {
    resolve(res)
  }).catch(err => {
    console.error(err)
  })
})

export const createUserIfNotExist = (u: User): Promise<object> => new Promise(resolve => {
  const query = Bb.ins.Query('user')
  query.equalTo('wechatId', '==', u.wechatId)
  query.find().then(res => {
    console.log(res)
    resolve()
  })
})

export default {}
