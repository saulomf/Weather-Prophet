import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eeeeee",
    paddingHorizontal: 16,
  },

  header: {
    marginTop: 20,
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

  headerButton: {
    justifyContent: "center",
  },

  cityname: {
    fontSize: 18,
    color: "white",
    textAlign: "left",
    flex: 1,
  },

  temp: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "right",
    flex: 1,
  },

  otherText: {
    color: "#dddddd",
  },

  textIcon: { flex: 1, flexDirection: "row", alignItems: "center" },

  icon: { flex: 1, alignItems: "flex-end", marginRight: 4 },
});
