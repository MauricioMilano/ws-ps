import { Response } from 'express';

export interface ExceptionMessage{
  error:string
}
export class ExceptionMessage{
  public error:string;
  constructor(error:string){
    this.error = error;
  }
}
export class Exception {
  private exception: ExceptionMessage
  private message: string
  constructor(message:string, exception:any){
    this.exception = new ExceptionMessage(`${message}:${exception}`);
    this.message = message
  }

  badRequest(res:Response){
    return res.send(this.exception).status(400)
  }
  unauthorized(res:Response){
    return res.send(this.exception).status(401)
  }
  notAcceptable(res:Response){
    return res.send(this.exception).status(406)
  }
  notFound(res:Response){
    return res.send(this.exception).status(404)
  }
  unprocessableEntity(res:Response){
    return res.send(this.exception).status(422)
  }
}