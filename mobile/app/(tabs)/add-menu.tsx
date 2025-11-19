import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, SafeAreaView } from "react-native";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import { COLORS, FONTS, SPACING, SHADOWS } from "../../constants/theme";

export default function AddMenuScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddMenu = async () => {
    if (!name || !price) {
      Alert.alert("Error", "Name and price are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/menu/add`, {
        name,
        description,
        price: parseFloat(price),
        image,
        category: category || "Other"
      });
      Alert.alert("Success", `Menu item "${res.data.name}" added!`);
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setCategory("");
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Add New Menu Item</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter item name"
              placeholderTextColor={COLORS.textSecondary}
              style={styles.input}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
              placeholderTextColor={COLORS.textSecondary}
              multiline
              numberOfLines={3}
              style={[styles.input, styles.textArea]}
            />

            <Text style={styles.label}>Price *</Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="Enter price"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="numeric"
              style={styles.input}
            />

            <Text style={styles.label}>Category</Text>
            <TextInput
              value={category}
              onChangeText={setCategory}
              placeholder="e.g., Pizza, Burger, Salad"
              placeholderTextColor={COLORS.textSecondary}
              style={styles.input}
            />

            <Text style={styles.label}>Image URL</Text>
            <TextInput
              value={image}
              onChangeText={setImage}
              placeholder="Enter image URL"
              placeholderTextColor={COLORS.textSecondary}
              style={styles.input}
            />

            <TouchableOpacity
              onPress={handleAddMenu}
              disabled={loading}
              style={[styles.button, loading ? styles.buttonDisabled : null]}
            >
              <Text style={styles.buttonText}>
                {loading ? "Adding..." : "Add Menu Item"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 20,
  },
  scrollContainer: {
    padding: SPACING.l,
    paddingBottom: 40,
  },
  title: {
    fontSize: FONTS.size.xxlarge,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.l,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.l,
    borderRadius: 20,
    ...SHADOWS.light,
  },
  label: {
    fontSize: FONTS.size.medium,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: FONTS.size.medium,
    backgroundColor: COLORS.background,
    color: COLORS.textPrimary,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    ...SHADOWS.medium,
  },
  buttonDisabled: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    color: COLORS.textLight,
    fontSize: FONTS.size.large,
    fontWeight: "bold",
  },
});
