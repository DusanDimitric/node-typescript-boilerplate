import { Container } from 'inversify'

export const TYPES = {
  IServer     : Symbol.for('IServer'),
  IGreeter    : Symbol.for('IGreeter'),
  App         : Symbol.for('App'),
  UserService : Symbol.for('UserService'),
}

import App from '@web/App'
import IServer from '@web/server/IServer'
import ExpressServer from '@web/server/ExpressServer'
import { UserService } from '@app/services/User'
import IGreeter from '@domain/IGreeter'
import Greeter from '@domain/Greeter'

export const container = new Container()
container.bind<IGreeter>(TYPES.IGreeter).to(Greeter)
container.bind<UserService>(TYPES.UserService).to(UserService)
container.bind<IServer>(TYPES.IServer).to(ExpressServer)
container.bind<App>(TYPES.App).to(App)
