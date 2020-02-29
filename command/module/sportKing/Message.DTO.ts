import { translate } from './utils'

interface MessageOptions {
  robotnickname: string[];
  robotid: string;
  mid: string;
  nickname: string;
  content: string;
  atlist: string;
}

export default class Message {
  private msg: string

  private robotId: string

  private robotName: string

  private isDirectToRobot: boolean

  constructor(options: MessageOptions) {
    this.robotId = options.robotid
    this.robotName = translate(options.robotnickname[0])

    if (options.atlist.indexOf(this.robotId) < 0) {
      this.isDirectToRobot = false
    } else {
      this.isDirectToRobot = true
    }

    this.msg = translate(options.content.trim())
  }

  get isDirect(): boolean {
    return this.isDirectToRobot
  }

  get content(): string {
    return this.msg
  }

  get pureContent(): string {
    return this.msg.replace(`@${this.robotName}`, '').trim()
  }
}

// group message template
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
