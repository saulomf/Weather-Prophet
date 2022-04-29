import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src";
import Search from "./src/Search";
import Details from "./src/Details";

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
          options={({ route }) => ({ title: route.params.city.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
