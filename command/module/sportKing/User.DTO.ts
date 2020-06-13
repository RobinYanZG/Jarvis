export default class User {
  private pWechatId: string;

  private pProfile: object;

  private pUsername: string;

  private pId: string;

  constructor(wechatId: string, username: string, profile?: object, id?: string) {
    this.pUsername = username
    this.pWechatId = wechatId
    this.pProfile = profile || {}
    this.pId = id || ''
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

  public get id(): string {
    return this.pId;
  }

  public setObjectId(id: string) {
    this.pId = id;
  }
}
