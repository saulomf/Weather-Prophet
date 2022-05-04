import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { styles } from "./styles";
import { Store } from "../../../services/asyncStorage";

const SearchBox = ({ dataReceived, placeholder, set, navigation }) => {
  const [inputText, onChangeInput] = useState("");
  const [data, setData] = useState(dataReceived);
  const [openList, setOpenList] = useState(false);

  function updateList() {
    if (inputText === "") {
      setData(dataReceived);
    } else {
      const filtered = dataReceived.filter((item) => {
        return item.nome.includes(inputText);
      });
      setData(filtered);
    }
  }

  const renderItem = ({ item }) => (
    <View style={{ margin: 4 }}>
      <TouchableOpacity
        onPress={
          item.sigla
            ? () => {
                setOpenList(false);
                onChangeInput(item.nome);
                set(item.sigla);
                // getCidades(item.sigla);
              }
            : () => {
                Store("cities", item.nome);
                set((prev) => [...prev, item.nome]);
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
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(item) => {
          onChangeInput(item);
          updateList();
        }}
        onPressIn={() => setOpenList(true)}
        value={inputText}
        placeholder={placeholder}
      />
      {openList && inputText !== "" ? (
        <View style={styles.list}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(index) => index.id}
          />
        </View>
      ) : null}
      {inputText === "" ? (
        <View style={styles.list}>
          <Text>Comece a digitar...</Text>
        </View>
      ) : null}
    </View>
  );
};
export default SearchBox;
