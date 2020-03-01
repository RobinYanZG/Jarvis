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
  query.set('time', r.time)
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
    if (Array.isArray(res) && res.length > 0) {
      resolve()
    } else {
      const q = Bb.ins.Query('user')
      q.set('wechatId', u.wechatId)
      q.set('username', u.username)
      q.set('profile', u.profile)
      query.save().then(r => {
        resolve(r)
      }).catch(err => {
        console.error(err)
      })
    }

  })
})

export default {}
