import type { ReqErrPayload } from "../../../dto/authRes.dto"
import type ReqResDto from "../../../dto/authRes.dto"
import type LoginDto from "../../../dto/login.dto"

export default async function loginEndpoint(loginDto: LoginDto): Promise<ReqResDto> {
  let res = await fetch(import.meta.env.BASE_URL + "/auth/login", {
    method: "POST",
    body: JSON.stringify(loginDto)
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


