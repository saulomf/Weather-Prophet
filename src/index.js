// @refresh reset
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import apiGET from "../services/api";
import { styles } from "./styles";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Get, Store, Delete } from "../services/asyncStorage";

const Home = ({ navigation }) => {
  const [cidades, setCidades] = useState([]);
  const [cidadesNomes, setCidadesNomes] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [favoritosNomes, setFavoritosNomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCitiesNames();
    getFavoritesNames();
  }, []);

  useEffect(() => {
    getData();
  }, [cidadesNomes]);

  useEffect(() => {
    getFavorites();
  }, [favoritosNomes]);

  const getCitiesNames = async () => {
    const citiesNames = await Get("cities");
    setCidadesNomes(citiesNames);
  };

  const getFavoritesNames = async () => {
    const favoritesNames = await Get("favorites");
    setFavoritosNomes(favoritesNames);
  };

  async function getData() {
    setCidades([]);
    for (item of cidadesNomes) {
      const response = await apiGET({
        type: 1,
        query: `weather?q=${item}`,
      });
      setCidades((prev) => [...prev, response]);
    }
    setLoading(false);
  }

  async function getFavorites() {
    setFavoritos([]);
    for (item of favoritosNomes) {
      const response = await apiGET({
        type: 1,
        query: `weather?q=${item}`,
      });
      setFavoritos((prev) => [...prev, response]);
    }
  }

  async function addFavorite(item) {
    Store("favorites", item.name);
    setFavoritos((prev) => [...prev, item]);
    setFavoritosNomes((prev) => [...prev, item.name]);
  }

  const headerFavorites = () => (
    <View>
      {favoritos.length > 0 ? (
        <View style={styles.header}>
          <Text style={styles.headerText}>Favoritos</Text>
        </View>
      ) : null}
    </View>
  );

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
        onPress={() =>
          navigation.navigate("Search", { setCity: setCidadesNomes })
        }
      >
        <Ionicons name="add-circle-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  const renderCidades = (item, index) => {
    if (typeof item === "string")
      return (
        <View key={index}>
          <LinearGradient
            colors={["#af5c5c", "#a84b4b", "#7a2929"]}
            style={{ borderRadius: 5, padding: 10, marginBottom: 10 }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.cityname}>{item}</Text>
              <Text style={styles.temp}>-°</Text>
            </View>
            <Text style={styles.otherText}>
              Dados climáticos indisponíveis para esta cidade
            </Text>
          </LinearGradient>
        </View>
      );
    const { description } = item?.weather[0];
    return (
      <View key={index}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", {
              city: item,
              updateCities: setCidadesNomes,
              updateFavorites: setFavoritosNomes,
            })
          }
        >
          <LinearGradient
            colors={["#5c76af", "#4b69a8", "#293f7a"]}
            style={{ borderRadius: 5, padding: 10, marginBottom: 10 }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.cityname}>{item.name}</Text>
              <Text style={styles.temp}>{Math.trunc(item?.main?.temp)}°</Text>
            </View>
            <Text style={styles.otherText}>
              {description[0].toUpperCase() + description.slice(1)}
            </Text>
            <View style={styles.textIcon}>
              <Text style={styles.otherText}>
                <Text>Min: {Math.trunc(item?.main?.temp_min)}°</Text> -{" "}
                <Text>Max: {Math.trunc(item?.main?.temp_max)}°</Text>
              </Text>
              <View style={styles.icon}>
                <TouchableOpacity
                  onPress={async () => {
                    if (favoritosNomes.includes(item.name)) {
                      const updatedFavorites = await Delete(
                        "favorites",
                        item.name
                      );
                      setFavoritosNomes(updatedFavorites);
                      await Store("cities", item.name);
                      setCidadesNomes((prev) => [...prev, item.name]);
                    } else {
                      const updatedCities = await Delete("cities", item.name);
                      setCidadesNomes(updatedCities);
                      addFavorite(item);
                    }
                  }}
                >
                  {favoritosNomes.includes(item.name) ? (
                    <Entypo name="star" size={24} color="#dddddd" />
                  ) : (
                    <Ionicons name="star-outline" size={24} color="#dddddd" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };
  if (loading) return <View style={styles.container}>{header()}</View>;
  return (
    <ScrollView>
      <View style={styles.container}>
        {headerFavorites()}
        {favoritos.map((item, index) => renderCidades(item, index))}
      </View>
      <View style={styles.container}>
        {header()}
        {cidades.map((item, index) => renderCidades(item, index))}
      </View>
    </ScrollView>
  );
};

export default Home;
