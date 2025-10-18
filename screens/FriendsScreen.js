import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { styles } from "../styles/FriendsStyles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addFriendByEmail,
  fetchFriendsForCurrentUser,
} from "../firebase/AuthModel";
const AVATAR_PLACEHOLDER =
  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&h=200&fit=crop";

export default function FriendsScreen() {
  const { user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [items, setItems] = useState([]);

  const loadFriends = async () => {
    try {
      const list = await fetchFriendsForCurrentUser();
      const mapped = list.map((f) => ({
        id: f.id,
        name:
          `${(f.firstname || "").trim()} ${(f.lastname || "").trim()}`.trim() ||
          f.email,
        email: f.email,
        phone: f.studentID || "",
        avatar: f.photoURL || AVATAR_PLACEHOLDER,
      }));
      setItems(mapped);
    } catch (e) {
      // silently ignore or alert
    }
  };

  useEffect(() => {
    loadFriends();
  }, []);

  const onAdd = async () => {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      Alert.alert("Invalid email", "Please enter a valid email.");
      return;
    }
    try {
      setSubmitting(true);
      await addFriendByEmail(trimmed);
      setEmail("");
      await loadFriends();
      Alert.alert("Added", "Friend added successfully.");
    } catch (e) {
      Alert.alert("Unable to add", e.message || "Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const Header = (
    <View style={styles.addFriendRow}>
      <TextInput
        placeholder="friend@example.com"
        style={styles.addFriendInput}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="done"
        blurOnSubmit={false}
      />
      <Pressable style={styles.addButton} onPress={onAdd} disabled={submitting}>
        <Text style={styles.addButtonLabel}>{submitting ? "…" : "+"}</Text>
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
      {Header}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}
