import { z } from "zod";
import 'dotenv/config';
import type { AxiosStatic } from "axios";

export const locationInfoSchema = z.object({
  lat: z.string(),
  lon: z.string(),
  display_name: z.string(),
});

export type LocationInfo = z.infer<typeof locationInfoSchema>;

export async function fetchLocationData(axios: AxiosStatic, apiUrl: string, locationName: string): Promise<LocationInfo> {
  const options= {
    method: "GET",
    url: apiUrl,
    params: {
      q: locationName,
      api_key: process.env.GEOCODE_API_KEY,
    }
  }

  const response = await axios.request(options);
  if (response.status === 200) {
    try {
      return locationInfoSchema.parse(response.data[0]);
    } catch(err) {
      console.error(err)
      throw new Error(`Unable to find location information for ${location}`);
    }
  } else {
    throw new Error('Failed to fetch location data');
  }
}