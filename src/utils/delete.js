import AsyncStorage from "@react-native-async-storage/async-storage";
const Delete = async (tipo, name) => {
  let cities = [];
  try {
    const jsonValue = await AsyncStorage.getItem("@" + tipo);
    const citiesStored = jsonValue != null ? JSON.parse(jsonValue) : null;
    if (citiesStored != null) cities = citiesStored.cities;
  } catch (e) {
    console.error(e);
  }
  const updatedCities = cities.filter((item) => {
    return item !== name;
  });
  // console.log(cities);
  const citiesObject = { cities: updatedCities };
  try {
    const jsonValue = JSON.stringify(citiesObject);
    await AsyncStorage.setItem("@" + tipo, jsonValue);
  } catch (e) {
    // saving error
  }
  return updatedCities;
};
export default Delete;
