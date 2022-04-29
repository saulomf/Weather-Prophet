import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import apiGET from "../services/api";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const [cidades, setCidades] = useState([]);
  const [cidadesNomes, setCidadesNomes] = useState([]);
  const isfocused = useIsFocused();

  useEffect(() => {
    if (isfocused) {
      getCitiesNames();
      getData();
    }
  }, [isfocused]);

  const getCitiesNames = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@cities");
      const citiesObject = jsonValue != null ? JSON.parse(jsonValue) : null;
      citiesObject !== null ? setCidadesNomes(citiesObject.cities) : [];
    } catch (e) {
      console.error(e);
    }
  };

  async function getData() {
    setCidades([]);
    const list = [];

    cidadesNomes.forEach(async (item) => {
      const response = await apiGET({
        type: 1,
        query: `weather?q=${item}`,
      });
      list.push(response);
    });
    console.log(list.length);
    setCidades(list);
  }

  const header = () => (
    <View style={styles.header}>
      {cidades.length === 0 ? (
        <Text style={styles.headerText}>
          Parece que você ainda não adicionou uma cidade a sua lista, tente
          tocando no botão ao lado
        </Text>
      ) : (
        <Text style={styles.headerText}>Cidades</Text>
      )}
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => navigation.navigate("Search")}
      >
        <Ionicons name="add-circle-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  const renderCidades = ({ item }) => {
    //console.log(item);
    return (
      <View>
        <LinearGradient
          colors={["#5c76af", "#4b69a8", "#293f7a"]}
          style={{ borderRadius: 5, padding: 10, marginBottom: 10 }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={styles.cityname}>{item.name}</Text>
            <Text style={styles.temp}>{Math.trunc(item?.main.temp)}°</Text>
          </View>
          <Text>{item.weather[0].description}</Text>
          <Text>
            <Text>{Math.trunc(item.main.temp_min)}°</Text> -{" "}
            <Text>{Math.trunc(item.main.temp_max)}°</Text>
          </Text>
        </LinearGradient>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={cidades}
        keyExtractor={(index) => index.cod}
        renderItem={renderCidades}
        ListHeaderComponent={header}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default Home;
