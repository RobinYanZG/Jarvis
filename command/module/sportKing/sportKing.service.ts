import moment from 'moment';
import Bmob from 'hydrogen-js-sdk'

import Record from './Record.DTO'
import User from './User.DTO'
import Bb from './Bmob'

interface IUser {
  wechatId: string
  username:string;
  profile:object;
  objectId:string;
}

interface NewCreateUser {
  objectId: string;
}

interface ISum {
  _sumTime: number;
  user: User;
}

export const getUserAndCreateIfNotExist = async (u: User): Promise<User> => new Promise(resolve => {
  const query = Bb.ins.Query('user')
  query.equalTo('wechatId', '==', u.wechatId)
  query.find().then(res => {
    if (Array.isArray(res) && res.length > 0) {
      console.log('user existed:', u.username)
      const _user = res[0] as IUser
      resolve(new User(_user.wechatId, _user.username, _user.profile, _user.objectId))
    } else {
      const q = Bb.ins.Query('user')
      q.set('wechatId', u.wechatId)
      q.set('username', u.username)
      q.set('profile', u.profile) // set方法不支持object类型，需改Npm package内的set方法支持object
      q.save().then((r) => {
        console.log('user created:', u.username)
        u.setObjectId((r as unknown as NewCreateUser).objectId)
        resolve(u)
      }).catch(err => {
        console.error(err)
      })
    }
  })
})


export const findUserById = async (id: string): Promise<object> => new Promise(resolve => {
  console.log(id)
  const query = Bb.ins.Query('user')
  query.equalTo('wechatId', '==', id)
  query.find().then(res => {
    resolve(res)
  })
})

export const saveRecord = (r: Record): Promise<object> => new Promise(resolve => {
  const pointer = Bmob.Pointer('user')
  const poiID = pointer.set(r.userId)
  const query = Bb.ins.Query('record')
  query.set('time', r.time) // set方法不支持number类型，需改Npm package内的set方法支持number
  query.set('userId', r.userId)
  query.set('user', poiID)

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

export const getRecordsByDay = (dayOffset = 0): Promise<ISum[]> => new Promise(resolve => {
  let startTime = moment().endOf('day').subtract(dayOffset + 1, 'd').add(2, 'h').format('YYYY-MM-DD hh:mm:ss')
  let endTime = moment().endOf('day').subtract(dayOffset, 'd').add(2, 'h').format('YYYY-MM-DD hh:mm:ss')
  const query = Bb.ins.Query('record')
  query.statTo("sum", "time");
  query.statTo("groupby", "user");
  query.include('user','user')
  query.equalTo('createdAt', '>', startTime)
  query.equalTo('createdAt', '<=',  endTime)

  query.find().then(res => {
    resolve((res as unknown as ISum[]))
  });
})

export default {}
