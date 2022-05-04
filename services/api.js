import axios from "axios";
import { OPENWEATHER_API_KEY } from "@env";

const key_lang_unit = `,BR&appid=${OPENWEATHER_API_KEY}&lang=pt_br&units=metric`;
const ip = "https://api.openweathermap.org/data/2.5/";

async function apiGET(params) {
  const { query, type } = params;
  try {
    response = await axios.get(type === 2 ? query : ip + query + key_lang_unit);
    return response.data;
  } catch (error) {
    return query.slice(10);
  }
}
export default apiGET;
