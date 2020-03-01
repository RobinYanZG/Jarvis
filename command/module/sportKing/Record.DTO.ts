export default class Record {
  private pTime: number

  private pUserId: string

  constructor(t: number, id: string) {
    this.pTime = t
    this.pUserId = id
  }

  get time(): number {
    return this.pTime
  }

  get userId(): string {
    return this.pUserId
  }
}
