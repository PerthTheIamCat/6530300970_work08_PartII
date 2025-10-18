import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  friendsContainer: {
    flex: 1,
    backgroundColor: "#EEFCDC",
  },
  listContent: {
    paddingBottom: 24,
  },
  addFriendRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    width: "92%",
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 18,
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  addFriendInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#d1d1d1",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonLabel: {
    fontSize: 20,
    color: "#555",
    lineHeight: 20,
  },
  itemWrapper: {
    alignSelf: "center",
    width: "92%",
    marginTop: 16,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  itemEmail: {
    fontSize: 14,
    color: "#7a7a7a",
    marginTop: 2,
  },
  itemPhone: {
    marginTop: 10,
    marginLeft: 62,
    fontSize: 16,
    color: "#1a1a1a",
  },
});
