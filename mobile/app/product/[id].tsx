import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { API_BASE_URL } from '../../constants/api';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { COLORS, FONTS, SPACING, SHADOWS } from '../../constants/theme';

interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams();
    const [item, setItem] = useState<MenuItem | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { addItem } = useCart();

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/menu/${id}`);
            if (response.ok) {
                const data = await response.json();
                setItem(data);
            } else {
                console.error('Product not found');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (item) {
            addItem({
                id: item._id,
                name: item.name,
                price: item.price,
                image: item.image,
            });
            router.push('/cart');
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (!item) {
        return (
            <View style={styles.center}>
                <Text>Product not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>${item.price.toFixed(2)}</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.sectionTitle}>Delivery info</Text>
                        <Text style={styles.infoText}>Delivered between monday aug and thursday 20 from 8pm to 91:32 pm</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Return policy</Text>
                    <Text style={styles.infoText}>All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately.</Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <Text style={styles.addToCartText}>Add to cart</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    scrollContent: {
        paddingBottom: 100,
    },
    header: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
    },
    backButton: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: 20,
        padding: 8,
        ...SHADOWS.light,
    },
    imageContainer: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 125,
        resizeMode: 'cover',
        ...SHADOWS.medium,
    },
    detailsContainer: {
        padding: SPACING.l,
        backgroundColor: COLORS.cardBackground,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 20,
        minHeight: 500,
    },
    name: {
        fontSize: FONTS.size.xxlarge,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: SPACING.s,
        textAlign: 'center',
    },
    price: {
        fontSize: FONTS.size.xlarge,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginBottom: SPACING.l,
        textAlign: 'center',
    },
    infoRow: {
        marginBottom: SPACING.l,
    },
    sectionTitle: {
        fontSize: FONTS.size.medium,
        fontWeight: 'bold',
        marginBottom: SPACING.s,
        color: COLORS.textPrimary,
    },
    infoText: {
        fontSize: FONTS.size.medium,
        color: COLORS.textSecondary,
        lineHeight: 24,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.background, // Or transparent if we want it floating
        padding: SPACING.l,
        paddingBottom: 40,
    },
    addToCartButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        paddingVertical: 18,
        alignItems: 'center',
        ...SHADOWS.medium,
    },
    addToCartText: {
        color: COLORS.textLight,
        fontSize: FONTS.size.large,
        fontWeight: 'bold',
    },
});
