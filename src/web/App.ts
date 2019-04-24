import { injectable, inject } from 'inversify'
import { TYPES } from '@infrastructure/inversify.config'

import IServer from '@web/server/IServer'

@injectable()
export default class App {
  constructor(@inject(TYPES.IServer) private server: IServer) {}

  public run(): void {
    this.server.start()
  }
}
