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
  query.set('time', r.time) // set方法不支持number类型，需改Npm package内的set方法支持number
  query.set('userId', r.userId)

  query.save().then(res => {
    console.log('record created:', r.time)
    resolve(res)
  }).catch(err => {
    console.error(err)
  })
})

export const createUserIfNotExist = (u: User): Promise<object> => new Promise(resolve => {
  const query = Bb.ins.Query('user')
  query.equalTo('wechatId', '==', u.wechatId)
  query.find().then(res => {
    if (Array.isArray(res) && res.length > 0) {
      console.log('user existed:', u.username)
      resolve()
    } else {
      const q = Bb.ins.Query('user')
      q.set('wechatId', u.wechatId)
      q.set('username', u.username)
      q.set('profile', u.profile) // set方法不支持object类型，需改Npm package内的set方法支持object
      q.save().then(r => {
        console.log('user created:', u.username)
        resolve(r)
      }).catch(err => {
        console.error(err)
      })
    }
  })
})

export default {}
