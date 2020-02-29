interface PersonOptions {
  name: string;
  id: string;
  t?: number;
}

export default class Person {
  private name: string

  private wechatId: string

  private t: number

  constructor(options: PersonOptions) {
    this.name = options.name
    this.wechatId = options.id
    this.t = options.t || 0
  }

  public get time(): number {
    return this.t
  }

  public get nickName(): string {
    return this.name
  }
}
