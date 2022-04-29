import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import apiGET from "../../services/api";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Search = ({ navigation }) => {
  const [cidades, setCidades] = useState([]);
  const [cidadesCopia, setCidadesCopia] = useState([]);
  const [inputCidade, onChangeInputCidade] = useState("");
  const [estados, setEstados] = useState([]);
  const [estadosCopia, setEstadosCopia] = useState([]);
  const [inputEstado, onChangeInputEstado] = useState("");

  useEffect(() => {
    getEstados();
  }, []);

  async function getEstados() {
    const response = await apiGET({
      query:
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome",
      type: 2,
    });
    setEstados(response);
    setEstadosCopia(response);
  }

  async function getCidades(UF) {
    const response = await apiGET({
      query: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios?orderBy=nome`,
      type: 2,
    });
    setCidades(response);
    setCidadesCopia(response);
  }

  function atualizaListaEstado() {
    //Atualiza a lista mostrada na tela e recupera a lista completa
    if (inputEstado === "") {
      //quando os filtros são removidos
      setEstados(estadosCopia);
    } else {
      const filtrados = estadosCopia.filter((elemento) => {
        return elemento.nome.includes(inputEstado);
      });
      setEstados(filtrados);
    }
  }

  function atualizaListaCidade() {
    if (inputCidade === "") {
      //quando os filtros são removidos
      setEstados(cidadesCopia);
    } else {
      const filtrados = cidadesCopia.filter((elemento) => {
        return elemento.nome.includes(inputCidade);
      });
      setCidades(filtrados);
    }
  }

  const storeData = async (value) => {
    let cities = [];
    try {
      const jsonValue = await AsyncStorage.getItem("@cities");
      const citiesStored = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (citiesStored != null) cities = citiesStored.cities;
    } catch (e) {
      console.error(e);
    }
    cities.push(value);
    // console.log(cities);
    const citiesObject = { cities: cities };
    try {
      const jsonValue = JSON.stringify(citiesObject);
      await AsyncStorage.setItem("@cities", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ margin: 4 }}>
      <TouchableOpacity
        onPress={
          item.sigla
            ? () => {
                onChangeInputEstado(item.nome);
                getCidades(item.sigla);
              }
            : () => {
                storeData(item.nome);
                navigation.navigate("Home");
              }
        }
      >
        <Text>
          {item.nome}
          {item.sigla ? " - " + item.sigla : ""}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Busque pela cidade desejada</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(elemento) => {
          onChangeInputEstado(elemento);
          atualizaListaEstado();
        }}
        value={inputEstado}
        placeholder="Digite o nome do estado desejado"
      />
      {cidades.length === 0 ? (
        <View style={styles.list}>
          <FlatList
            data={estados}
            renderItem={renderItem}
            keyExtractor={(index) => index.id}
          />
        </View>
      ) : null}
      {cidades.length > 0 ? (
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            onChangeText={(elemento) => {
              onChangeInputCidade(elemento);
              atualizaListaCidade();
            }}
            value={inputCidade}
            placeholder="Digite o nome da cidade desejada"
          />
          <View style={styles.list}>
            <FlatList
              data={cidades}
              renderItem={renderItem}
              keyExtractor={(index) => index.id}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Search;