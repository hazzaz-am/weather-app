import { API_CONFIG } from "./config";
import {
	Coordiantes,
	WeatherData,
	ForeCastData,
	GeoCodingResponse,
} from "./types";

class WeatherAPI {
	private createUrl(endpoint: string, params: Record<string, string | number>) {
		const searchParams = new URLSearchParams({
			appid: API_CONFIG.API_KEY,
			...params,
		});

		return `${endpoint}?${searchParams.toString()}`;
	}

	private async fetchData<T>(url: string): Promise<T> {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Weather API error: ${response.statusText}`);
		}

		return response.json();
	}

	async getCurrentWeather({ lat, lon }: Coordiantes): Promise<WeatherData> {
		const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
			lat: lat.toString(),
			lon: lon.toString(),
			units: API_CONFIG.DEFAULT_PARAMS.units,
		});

		return this.fetchData<WeatherData>(url);
	}

	async getForecast({ lat, lon }: Coordiantes): Promise<ForeCastData> {
		const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
			lat: lat.toString(),
			lon: lon.toString(),
			units: API_CONFIG.DEFAULT_PARAMS.units,
		});

		return this.fetchData<ForeCastData>(url);
	}

	async reverseGeocode({
		lat,
		lon,
	}: Coordiantes): Promise<GeoCodingResponse[]> {
		const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
			lat: lat.toString(),
			lon: lon.toString(),
			limit: 1,
		});

		return this.fetchData<GeoCodingResponse[]>(url);
	}
}

export const weatherAPI = new WeatherAPI();
