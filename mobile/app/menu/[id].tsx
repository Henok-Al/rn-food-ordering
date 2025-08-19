// app/menu/[id].tsx
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, Button, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { API_BASE_URL } from "../../constants/api";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import QuantitySelector from "../../components/QuantitySelector";

export default function MenuDetail() {
  const { id } = useLocalSearchParams();
  const { data: item, loading } = useFetch<any>(`${API_BASE_URL}/menu/${id}`);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price}</Text>

      <QuantitySelector quantity={qty} setQuantity={setQty} />

      <View style={styles.buttonContainer}>
  <TouchableOpacity
    style={styles.addToCartButton}
    onPress={() => addToCart(item, qty)}
  >
    <Text style={styles.addToCartText}>Add to Cart</Text>
  </TouchableOpacity>
</View>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  loadingText: {
    flex: 1,
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 16,
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
    color: "#222",
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: "600",
    color: "#28a745",
    marginBottom: 20,
  },
  quantityContainer: {
    marginBottom: 20,
  },
 buttonContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  addToCartButton: {
    backgroundColor: "#4CAF50", // green background
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addToCartText: {
    color: "#fff", // white text
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
