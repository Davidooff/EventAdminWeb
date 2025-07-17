import type { ReqErrPayload } from "../../../dto/authRes.dto"
import type ReqResDto from "../../../dto/authRes.dto"

export default async function refreshEndpoint(): Promise<ReqResDto> {
  let res = await fetch(import.meta.env.BASE_URL + "/auth/refresh", {
    method: "POST",
  })

  let body = res.body as Partial<ReqErrPayload>
  
  return {
    ok: res.ok,
    statusCode: res.status,
    errText: res.ok ? undefined : {
      title: body.title && `Error to auth ${res.status}`,
      detail: body.detail && `Server didn't provide msg. \n Status: ${res.statusText}`
    } as ReqErrPayload
  } 
} 