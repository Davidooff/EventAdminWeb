import type { ReqPayloadDto } from "../../../dto/authRes.dto";
import { authenticatedFetch } from "../api";

export default async function getAdminOptions() : Promise<ReqPayloadDto<number[]>> {
  var adminOptions = await authenticatedFetch<number[]>(import.meta.env.BASE_URL + "api/auth/admin", {method: "GET"})

  return adminOptions
} 