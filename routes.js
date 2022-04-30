import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src";
import Search from "./src/Search";
import Details from "./src/Details";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Delete from "./src/utils/delete";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: "#eeeeee",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Início" }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ title: "Busca" }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ route, navigation }) => ({
            title: route.params.city.name,
            headerRight: () => (
              <TouchableOpacity
                onPress={async () => {
                  updatedCities = await Delete(
                    "cities",
                    route.params.city.name
                  );
                  route.params.updateCities(updatedCities);
                  const updatedFavorites = await Delete(
                    "favorites",
                    route.params.city.name
                  );
                  route.params.updateFavorites(updatedFavorites);
                  navigation.goBack();
                }}
              >
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
