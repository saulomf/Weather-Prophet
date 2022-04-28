import axios from "axios";

const key_lang_unit =
  "&appid=ade94718803879a753d1239d109131fe&lang=pt_br&units=metric";
const ip = "https://api.openweathermap.org/data/2.5/";
//current = weather?q=São%20Paulo &appid=ade94718803879a753d1239d109131fe
//5days = forecast?q=Brasília &appid=ade94718803879a753d1239d109131fe

async function apiGET(params) {
  const { query } = params;

  try {
    response = await axios.get(ip + query + key_lang_unit);
    return response.data;
  } catch (error) {
    return [];
  }
}
export default apiGET;
