
export interface Logger {
  error(message: string):String;
  info(message: string):String;
  debug(message: string):String;

}
export class Logger implements Logger{
  error(message:String){
    console.error(message)
    return message
  }
  info(message:String){
    console.info(message)
    return message
  }
  debug(message:String){
    console.debug(message)
    return message
  }
}
