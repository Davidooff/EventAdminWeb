// import type ReqResDto from "../../dto/authRes.dto";
// import type { ReqPayloadDto } from "../../dto/authRes.dto";

// export function parseToResPayload<T>(res: Response): ReqPayloadDto<T> {
//   return {
//     ok: res.ok,
//     statusCode: res.status,
//     errText: res.ok ? undefined : res.body as any,
//     body: res.ok ? res.body as T : undefined
//   }
// }

// export function parseToRes(res: Response): ReqResDto {
//   return {
//     ok: res.ok,
//     statusCode: res.status,
//     errText: res.ok ? undefined : res.body as any,
//   }
// }