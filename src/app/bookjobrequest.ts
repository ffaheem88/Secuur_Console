export class BookJobRequest {

  constructor(
      public address: string,
      public startDate: string,
      public startTime: string,
      public duration: number,
      public instructions: string,
      public numberOfGuards: string,
      public type: string
  ){}

}
