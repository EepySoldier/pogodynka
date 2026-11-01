import type { Units } from "@/lib/weather";

type HrefParams = {
    city?: string,
    id?: number,
    lat?: number,
    lon?: number,
    units?: Units,
}

export function buildHref({ city, id, lat, lon, units }: HrefParams): string {
    const params = new URLSearchParams();
    if(city) params.set("city", city);
    if(id !== undefined) params.set("id", String(id));
    if(lat !== undefined && lon !== undefined) {
        params.set("lat", lat.toFixed(2));
        params.set("lon", lon.toFixed(2));
    }
    if(units === "imperial") params.set("units", units);

    const queryString = params.toString();
    return queryString ? `/?${queryString}` : "/";
}
