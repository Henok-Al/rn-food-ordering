import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, ScrollView, TextInput, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '../../constants/api';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, SHADOWS } from '../../constants/theme';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const CATEGORIES = ['All', 'Pizza', 'Burger', 'Sushi', 'Salad', 'Drinks', 'Dessert'];

export default function HomeScreen() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu`);
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/product/${item._id}`)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>Good Morning,</Text>
          <Text style={styles.headerTitle}>Delicious Food</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={40} color={COLORS.darkGray} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for food..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.activeCategoryChip,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: SPACING.l,
    paddingTop: SPACING.m,
    marginBottom: SPACING.l,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: FONTS.size.medium,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: FONTS.size.xxlarge,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  profileButton: {
    // Add styling if needed
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    borderRadius: 30,
    paddingHorizontal: SPACING.l,
    height: 50,
    marginHorizontal: SPACING.l,
    marginBottom: SPACING.l,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: FONTS.size.medium,
    color: COLORS.textPrimary,
  },
  categoriesContainer: {
    marginBottom: SPACING.m,
  },
  categoriesList: {
    paddingHorizontal: SPACING.l,
  },
  categoryChip: {
    paddingHorizontal: SPACING.l,
    paddingVertical: 10,
    marginRight: SPACING.m,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  activeCategoryChip: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.light,
  },
  categoryText: {
    fontSize: FONTS.size.medium,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  activeCategoryText: {
    color: COLORS.textLight,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: SPACING.l,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 30,
    width: '47%',
    marginBottom: SPACING.l,
    ...SHADOWS.medium,
    padding: SPACING.m,
    alignItems: 'center',
    paddingTop: 0,
    marginTop: 40, // Space for the image to pop out
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: -40, // Negative margin to pop out
    ...SHADOWS.medium,
    backgroundColor: COLORS.cardBackground, // Fallback
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    resizeMode: 'cover',
  },
  cardContent: {
    marginTop: SPACING.m,
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontSize: FONTS.size.large,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.s,
    color: COLORS.textPrimary,
  },
  price: {
    fontSize: FONTS.size.medium,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.medium,
  },
});
