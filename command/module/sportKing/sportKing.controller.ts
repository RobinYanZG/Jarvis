import { Context } from 'koa'

const TAG = '打卡'

const sportKing = (ctx: Context): void => {
  const { body } = ctx.request

  const content = unescape(body.content.replace(/\\u/g, '%u'))
  const { atlist, robotid } = body

  if (atlist.indexOf(robotid) < 0 || !content.startsWith(TAG)) {
    return
  }

  const { nickname, mid, displayname } = body
// 测试一下 什么是nickname 和displayname

  ctx.body = {
    rs: 1,
    tip: '#@sao261893666# yes', // @人有问题
    end: 0
  }
}

export default sportKing

// {
//   u: '123784',
//   robotnickname: [ 'Jarvis(Robin\\u2019 bot)', 'Jarvis(Robin\\u2019 bot)' ],
//   gid: '450653',
//   robotid: 'wxid_p8par65j4o512',
//   mid: 'sao261893666',
//   nickname: '\\u8089\\u997C\\u83DC\\u5305\\u897F\\u74DC',
//   displayname: '',
//   skw: '19064',
//   gname: 'Jarvis\\u6D4B\\u8BD5',
//   content: '\\u738B\\u8005',
//   own: 'sao261893666',
//   'ownname ': '\\u8089\\u997C\\u83DC\\u5305\\u897F\\u74DC',
//   msgid: '92235663702682298',
//   msgtype: '1',
//   isadmin: '0',
//   gadmin: ',,,sao261893666',
//   username: 'sao261893666',
//   atmod: '1',
//   gusername: '20020887336@chatroom',
//   vol: '3.74',
//   atlist: '',
//   voltype: 'xiaowing3'
// }
