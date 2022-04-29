import Home from "./src";
import Search from "./src/Search";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
