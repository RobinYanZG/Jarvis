export default class User {
  private pWechatId: string;

  private pProfile: object;

  private pUsername: string;

  constructor(wechatId: string, username: string, profile?: object) {
    this.pUsername = username
    this.pWechatId = wechatId
    this.pProfile = profile || {}
  }

  public get username(): string {
    return this.pUsername
  }

  public get wechatId(): string {
    return this.pWechatId
  }

  public get profile(): object {
    return this.pProfile
  }
}
