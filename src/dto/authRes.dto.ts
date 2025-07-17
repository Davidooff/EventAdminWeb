
export default interface ReqResDto {
  statusCode: number;
  ok: boolean;
  errText?: ReqErrPayload
};


export interface ReqPayloadDto<T> extends ReqResDto {
  body?: T
};

export interface ReqErrPayload {
  title: string,
  detail: string
}