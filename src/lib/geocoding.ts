type City = {
    name: string,
    latitude: number,
    longitude: number,
    country_code: string,
    timezone: string,
    population: number,
    country: string,
    admin1: string,
}

type GeocodingResponse = {
    results?: City[];
}

export async function getCityData(cityName: string): Promise<City[]> {
    const params = new URLSearchParams({
        name: cityName,
        count: "10",
        language: "en",
        format: "json",
    });

    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`);
    if(!response.ok){
        throw new Error("Geocoding server error" + response.status + " " + response.statusText);
    }
    const data: GeocodingResponse = await response.json();
    return data.results ?? [];
}