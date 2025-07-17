
import { authService } from "../../services/authService";
import type { ReqPayloadDto } from "../../dto/authRes.dto";
import type ReqResDto from "../../dto/authRes.dto";


export function parseResponseToStatus(res: Response): ReqResDto {
  return {
    ok: res.ok,
    statusCode: res.status,
    errText: res.ok ? undefined : res.body as any,
  }
}

// A helper to parse responses correctly
async function parseResponse<T>(res: Response): Promise<ReqPayloadDto<T>> {
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({ title: "Request failed", detail: res.statusText }));
    return { ok: false, statusCode: res.status, errText: errBody };
  }
  // Handle 204 No Content case
  if (res.status === 204) {
      return { ok: true, statusCode: res.status, body: undefined };
  }
  const body = await res.json();
  return { ok: true, statusCode: res.status, body: body as T };
}

export async function authenticatedFetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<ReqPayloadDto<T>> {
  let response = await fetch(input, init);

  // If we get a 401, try to refresh the token.
  if (response.status === 401) {
    console.log("Token expired. Attempting refresh...");
    const refreshResult = await authService.refresh();

    // If refresh succeeded, retry the original request
    if (refreshResult.ok) {
      console.log("Token refreshed. Retrying original request.");
      response = await fetch(input, init); // Retry
    } else {
      // If refresh failed, we are logged out.
      // We need a way to notify the UI. This will be handled by the AuthProvider.
      // We return the original 401 response error payload.
      console.error("Token refresh failed. User is logged out.");
      // Fire a custom event that the AuthProvider can listen to
      window.dispatchEvent(new Event('auth-failed'));
      return parseResponse(response);
    }
  }

  return parseResponse<T>(response);
}