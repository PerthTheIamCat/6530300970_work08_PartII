import { View, Text, FlatList, Image, TextInput, Pressable } from "react-native";
import { styles } from "../styles/FriendsStyles";

const DATA = [
  {
    id: "1",
    name: "Kanjana EngSRC",
    email: "kanjana@eng.src.ku.ac.th",
    phone: "6330301234",
    avatar:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Harley Cutecat",
    email: "harley@cuteboy.cat",
    phone: "6330309999",
    avatar:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c86?w=200&h=200&fit=crop",
  },
];

export default function FriendsScreen() {
  const renderHeader = () => (
    <View style={styles.addFriendRow}>
      <TextInput
        placeholder="kanjana@eng.src.ku.ac.th"
        style={styles.addFriendInput}
      />
      <Pressable style={styles.addButton} onPress={() => {}}>
        <Text style={styles.addButtonLabel}>+</Text>
      </Pressable>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemWrapper}>
      <View style={styles.itemRow}>
        <Image source={{ uri: item.avatar }} style={styles.itemAvatar} />
        <View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemEmail}>{item.email}</Text>
        </View>
      </View>
      <Text style={styles.itemPhone}>{item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.friendsContainer}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
