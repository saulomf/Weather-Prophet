import axios from "axios";

const key_lang_unit =
  ",BR&appid=9a7d5bafcfe7701d77b6b33eadbc9719&lang=pt_br&units=metric";
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
