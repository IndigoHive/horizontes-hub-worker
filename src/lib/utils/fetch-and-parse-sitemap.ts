import axios from "axios";
import { parseStringPromise } from "xml2js";

export async function fetchAndParseSitemap(url: string) {
  try {
    const response = await axios.get(url);
    const xml = response.data;

    const json = await parseStringPromise(xml);

    const urls = json.urlset.url.map((entry: any) => entry.loc[0]);

    return urls;
  } catch (error) {
    console.error("Error fetching or parsing sitemap:", error);
    return [];
  }
}
