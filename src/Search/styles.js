import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eeeeee",
    paddingHorizontal: 16,
    flex: 1,
  },

  input: {
    borderWidth: 1,
    borderColor: "#c0c0c0",
    padding: 5,
    marginTop: 5,
  },

  header: {
    marginTop: 40,
    marginBottom: 20,
    flexDirection: "row",
    marginEnd: 16,
  },

  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#404040",
    marginEnd: 16,
  },

  list: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#c0c0c0",
    padding: 5,
    marginBottom: 20,
    flex: 1,
  },
});
