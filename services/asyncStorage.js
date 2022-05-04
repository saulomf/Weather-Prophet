import AsyncStorage from "@react-native-async-storage/async-storage";

export const Delete = async (type, name) => {
  let cities = [];
  try {
    const jsonValue = await AsyncStorage.getItem("@" + type);
    const citiesStored = jsonValue != null ? JSON.parse(jsonValue) : null;
    if (citiesStored != null) cities = citiesStored.cities;
  } catch (e) {
    console.error(e);
  }
  const updatedCities = cities.filter((item) => {
    return item !== name;
  });
  const citiesObject = { cities: updatedCities };
  try {
    const jsonValue = JSON.stringify(citiesObject);
    await AsyncStorage.setItem("@" + type, jsonValue);
  } catch (e) {
    // saving error
  }
  return updatedCities;
};

export const Store = async (type, value) => {
  let cities = [];
  try {
    const jsonValue = await AsyncStorage.getItem("@" + type);
    const citiesStored = jsonValue != null ? JSON.parse(jsonValue) : null;
    if (citiesStored != null) cities = citiesStored.cities;
  } catch (e) {
    console.error(e);
  }
  cities.push(value);
  const citiesObject = { cities: cities };
  try {
    const jsonValue = JSON.stringify(citiesObject);
    await AsyncStorage.setItem("@" + type, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const Get = async (type) => {
  try {
    const jsonValue = await AsyncStorage.getItem("@" + type);
    const citiesObject = jsonValue != null ? JSON.parse(jsonValue) : null;
    if (citiesObject !== null) {
      return citiesObject.cities;
    } else return [];
  } catch (e) {
    console.error(e);
  }
};
