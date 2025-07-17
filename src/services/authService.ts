
import type LoginDto from "../dto/login.dto";
import type ReqResDto from "../dto/authRes.dto";
import { parseResponseToStatus } from "../utils/requests/api";

let refreshTokenRequest: Promise<Response> | null = null;

// const BASE_URL = process.meta.env.REACT_APP_API_URL;

export const authService = {
  login: async (loginDto: LoginDto): Promise<ReqResDto> => {
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDto),
    });
    if (!res.ok) {
        const errBody = await res.json().catch(() => ({ title: "Login failed", detail: res.statusText }));
        return { ok: false, statusCode: res.status, errText: errBody };
    }
    return { ok: true, statusCode: res.status };
  },

  refresh: async (): Promise<ReqResDto> => {
    if (refreshTokenRequest) {
      return parseResponseToStatus(await refreshTokenRequest);
    }

    refreshTokenRequest = fetch(`/api/auth/refresh`, { method: "POST" });
    
    try {
        const res = await refreshTokenRequest; // Await the promise
        if (!res.ok) {
            const errBody = await res.json().catch(() => ({ title: "Refresh failed", detail: res.statusText }));
            return { ok: false, statusCode: res.status, errText: errBody };
        }
        return { ok: true, statusCode: res.status };
    } finally {
        refreshTokenRequest = null;
    }
  },
};