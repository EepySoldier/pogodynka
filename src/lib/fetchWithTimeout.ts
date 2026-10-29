const DEFAULT_TIMEOUT_MS = 8000;

export function fetchWithTimeout(
    url: string,
    init: RequestInit = {},
    timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<Response> {
    return fetch(url, { ...init, signal: AbortSignal.timeout(timeoutMs) });
}