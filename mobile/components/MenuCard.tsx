import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  item: { _id: string; name: string; description: string; price: number; image: string };
  onPress: () => void;
}

export default function MenuCard({ item, onPress }: Props) {
  // console.log("Image URL:", item.image);



  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "600",
    marginTop: 8,
  },
});
