import Bmob, { Bmob as BType, Query, BmobPromise } from 'hydrogen-js-sdk'

export default class Bb {
  private static instance: BType

  static register(appId: string, secKey: string): void {
    Bmob.initialize(appId, secKey)
    this.instance = Bmob
  }

  static get ins(): BType {
    return this.instance
  }
}

export {
  Query,
  BmobPromise
}
