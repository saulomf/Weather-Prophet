import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import apiGET from "../../services/api";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";

const Details = ({ navigation, route }) => {
  const [climas, setClimas] = useState([]);
  const cidade = route.params.city;

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { city } = route.params;
    const response = await apiGET({
      type: 1,
      query: `forecast?q=${city.name}`,
    });
    const climasporDia = response.list.filter((element) => {
      return element.dt_txt.includes("12:00:00");
    });
    setClimas(climasporDia);
  }

  function formatdate(date) {
    const days = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    const day = date[8] + date[9];
    const month = date[5] + date[6];
    const year = date.slice(0, 4);
    const dayNumber = new Date(month + "/" + day + "/" + year);
    return days[dayNumber.getDay()];
  }

  const getIcon = (wheater) => {
    if (wheater.includes("Rain")) {
      return <Ionicons name="rainy-outline" size={24} color="#dddddd" />;
    } else if (wheater.includes("Clouds")) {
      return <Entypo name="icloud" size={24} color="#dddddd" />;
    } else return <Feather name="sun" size={24} color="#dddddd" />;
  };
  const header = () => {
    const { description, main } = cidade?.weather[0];
    return (
      <View>
        <LinearGradient
          colors={["#5c76af", "#4b69a8", "#293f7a"]}
          style={{
            borderRadius: 5,
            padding: 10,
            marginTop: 40,
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={styles.cityname}>Hoje</Text>
            <Text style={styles.temp}>{Math.trunc(cidade?.main?.temp)}°</Text>
          </View>
          <View style={styles.textIcon}>
            <Text style={[styles.otherText, { textAlign: "left" }]}>
              {description[0].toUpperCase() + description.slice(1)}
            </Text>
            <View style={styles.icon}>{getIcon(main)}</View>
          </View>
          <Text style={styles.otherText}>
            Temperatura Mínima: {Math.trunc(cidade?.main?.temp_min)}°
          </Text>
          <Text style={styles.otherText}>
            Temperatura Máxima: {Math.trunc(cidade?.main?.temp_max)}°
          </Text>
          <Text style={styles.otherText}>
            Sensação Térmica: {Math.trunc(cidade?.main?.feels_like)}°
          </Text>
          <View style={styles.textIcon}>
            <Text style={styles.otherText}>
              Humidade: {Math.trunc(cidade?.main?.humidity)}%
            </Text>
            <View style={styles.icon}>
              <Entypo name="drop" size={24} color="#dddddd" />
            </View>
          </View>
          <Text style={styles.otherText}>
            Pressão: {Math.trunc(cidade?.main?.pressure)} mb
          </Text>
        </LinearGradient>
        <View style={styles.header}>
          <Text style={styles.headerText}>Previsão para os próximos dias</Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const { description } = item?.weather[0];
    return (
      <View>
        <LinearGradient
          colors={["#5c76af", "#4b69a8", "#293f7a"]}
          style={{ borderRadius: 5, padding: 10, marginBottom: 10 }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={styles.cityname}>{formatdate(item.dt_txt)}</Text>
            <Text style={styles.temp}>{Math.trunc(item?.main?.temp)}°</Text>
          </View>
          <Text style={styles.otherText}>
            {description[0].toUpperCase() + description.slice(1)}
          </Text>
          <Text style={styles.otherText}>
            <Text>Min: {Math.trunc(item?.main?.temp_min)}°</Text> -{" "}
            <Text>Max: {Math.trunc(item?.main?.temp_max)}°</Text>
          </Text>
        </LinearGradient>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={climas}
        keyExtractor={(index) => index.dt}
        renderItem={renderItem}
        ListHeaderComponent={header}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default Details;
