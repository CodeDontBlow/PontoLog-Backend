import { Response } from "express";

enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export default abstract class ApiResponse<T> {
  protected reponseStatus: ResponseStatus;
  protected message: string;

  constructor(responseStatus: ResponseStatus, message: string) {
    this.reponseStatus = responseStatus;
    this.message = message;
  }

  protected prepare(res: Response, data: T): Response {
    return res.status(this.reponseStatus).json({
      status: this.reponseStatus,
      message: this.message,
      data: data,
    });
  }
}

export class SuccessResponse<T> extends ApiResponse<T> {
  private data: T;

  constructor(message: string, data: T) {
    super(ResponseStatus.SUCCESS, message);
    this.data = data;
  }

  public send(res: Response): Response {
    return super.prepare(res, this.data);
  }
}
