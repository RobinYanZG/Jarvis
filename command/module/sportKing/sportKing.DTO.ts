interface PersonOptions {
  name: string;
  id: string;
}

export default class Person {
  private name: string

  private wechatId: string

  private t: number


  constructor(options: PersonOptions) {
    this.name = options.name
    this.wechatId = options.id
  }

  public set time(t: number) {
    this.t = t
  }
}
