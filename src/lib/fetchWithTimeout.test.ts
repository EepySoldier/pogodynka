import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("fetchWithTimeout", () => {
    it("passes the url and options through and adds an abort signal", async () => {
        const fetchMock = vi.fn().mockResolvedValue(new Response("ok"));
        vi.stubGlobal("fetch", fetchMock);

        await fetchWithTimeout("https://example.com/data", { method: "POST" });

        const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
        expect(url).toBe("https://example.com/data");
        expect(init.method).toBe("POST");
        expect(init.signal).toBeInstanceOf(AbortSignal);
    });

    it("rejects with a TimeoutError when the request takes too long", async () => {
        vi.stubGlobal("fetch", vi.fn((_url: string, init: RequestInit) => {
            return new Promise((_resolve, reject) => {
                init.signal?.addEventListener("abort", () => reject(init.signal?.reason));
            });
        }));

        await expect(fetchWithTimeout("https://example.com/slow", {}, 10)).rejects.toMatchObject({
            name: "TimeoutError",
        });
    });
});
