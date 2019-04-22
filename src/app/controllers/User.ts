import { inject } from 'inversify'
import { Request } from 'express'
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete
} from 'inversify-express-utils'

import { TYPES } from '@infrastructure/inversify.config'
import { IUser, UserService } from '@app/services/User'

@controller('/users')
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  @httpGet('/')
  public getUsers(): IUser[] {
    return this.userService.getUsers()
  }

  @httpGet('/:id')
  public getUser(request: Request): (IUser | undefined) {
    const id = parseInt(request.params.id)
    return this.userService.getUser(id)
  }

  @httpPost('/')
  public newUser(request: Request): IUser {
    const { body: user } = request
    return this.userService.newUser(user)
  }

  @httpPut('/:id')
  public updateUser(request: Request): IUser {
    const { body: user } : { body: IUser } = request
    const id = parseInt(request.params.id)
    return this.userService.updateUser(id, user)
  }

  @httpDelete('/:id')
  public deleteUser(request: Request): { id: number } {
    const id = parseInt(request.params.id)
    this.userService.deleteUser(id)
    return { id }
  }
}