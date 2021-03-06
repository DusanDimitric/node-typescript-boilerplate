import { Container } from 'inversify'

export const TYPES = {
  IDBConnection   : Symbol.for('IDBConnection'),
  IServer         : Symbol.for('IServer'),
  UserService     : Symbol.for('UserService'),
  IUserRepository : Symbol.for('IUserRepository'),
  IGreeter        : Symbol.for('IGreeter'),
  App             : Symbol.for('App'),
}

import App from '@web/App'
// import IDBConnection from '@infrastructure/database/IDBConnection'
import IServer from '@web/server/IServer'
import ExpressServer from '@web/server/ExpressServer'
import UserService from '@app/services/UserService'
import IUserRepository from '@infrastructure/repositories/IUserRepository'
import UserRepository from '@infrastructure/repositories/UserRepository'
import IGreeter from '@domain/services/IGreeter'
import Greeter from '@domain/services/Greeter'
import MongoDBConnection from '@infrastructure/database/mongodb/MongoDBConnection'

export const container = new Container()
container.bind<MongoDBConnection>(TYPES.IDBConnection).to(MongoDBConnection)
container.bind<IGreeter>(TYPES.IGreeter).to(Greeter)
container.bind<UserService>(TYPES.UserService).to(UserService)
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository)
container.bind<IServer>(TYPES.IServer).to(ExpressServer)
container.bind<App>(TYPES.App).to(App)
