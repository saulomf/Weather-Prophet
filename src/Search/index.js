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
import { Store } from "../../services/asyncStorage";

const Search = ({ navigation, route }) => {
  const [cidades, setCidades] = useState([]);
  const [cidadesCopia, setCidadesCopia] = useState([]);
  const [inputCidade, onChangeInputCidade] = useState("");
  const [estados, setEstados] = useState([]);
  const [estadosCopia, setEstadosCopia] = useState([]);
  const [inputEstado, onChangeInputEstado] = useState("");
  const { setCity } = route.params;

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
      setCidades(cidadesCopia);
    } else {
      const filtrados = cidadesCopia.filter((elemento) => {
        return elemento.nome.includes(inputCidade);
      });
      setCidades(filtrados);
    }
  }

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
                Store("cities", item.nome);
                setCity((prev) => [...prev, item.nome]);
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
        onPressIn={() => setCidades([])}
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
