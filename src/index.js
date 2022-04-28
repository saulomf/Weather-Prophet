import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import apiGET from "../services/api";
import { styles } from "./styles";

const Home = () => {
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await apiGET({
      query: "weather?q=Brasília",
    });
    const list = [];
    list.push(response);
    setCidades(list);
  }

  const header = () => (
    <View>
      <Text>Parece que você ainda não adicionou uma cidade a sua lista</Text>
    </View>
  );

  const renderCidades = ({ item }) => {
    console.log(item);
    return (
      <View style={{ backgroundColor: "#ff0000" }}>
        <Text>
          <Text>{item.name}</Text>
          <Text>{item.main.temp}</Text>
        </Text>
        <Text>{item.weather.description}</Text>
        <Text>
          <Text>{item.main.temp_min}</Text> - <Text>{item.main.temp_max}</Text>
        </Text>
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
