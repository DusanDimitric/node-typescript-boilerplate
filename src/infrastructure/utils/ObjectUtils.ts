import { plainToClass } from 'class-transformer'

export function plainToInstance<T>(Type: new (...args: any[]) => T, plainObject: any) {
  delete plainObject._id // TODO: Delete this when class-transformer is updated
  const instance: T = plainToClass(Type, plainObject as T)
  // const instance: T = plainToClass(Type, plainObject as T)
  //   { // TODO: class-transformer needs to be updated to enable this
  //     excludeExtraneousValues: true,
  //   },
  // )
  return instance
}
