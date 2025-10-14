import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEFCDC",
    flexDirection: "column",
  },
  flex1: {
    flex: 1,
    backgroundColor: "red",
  },
  loginForm: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    width: "100%",
  },
  logo: {
    width: 150,
    height: 150,
  },
  forgotText: {
    color: "blue",
    marginTop: 10,
    textDecorationLine: "underline",
    fontSize: 20,
  },
  forgotContainer: {
    width: "80%",
    alignItems: "flex-end",
  },
});
