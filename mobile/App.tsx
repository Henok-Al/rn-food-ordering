import React from 'react';
import RootApp from './src/App';

export default function App() {
  return <RootApp />;
}

/*

type MenuItemExtra = {
  id: string;
  label: string;
  price: number;
};

type MenuItemSize = {
  id: string;
  label: string;
  priceModifier: number;
};

};

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  calories?: number;
  isPopular?: boolean;
  badges?: string[];
  sizes?: MenuItemSize[];
  extras?: MenuItemExtra[];
};

type MenuSection = {
  id: string;
  title: string;
  description?: string;
  items: MenuItem[];
};

type Restaurant = {
  name: string;
  tagline: string;
  rating: number;
  reviewCount: number;
  priceLevel: string;
  cuisine: string[];
  etaRange: string;
  heroImage: string;
  hours: {
    openHour: number; // 24h
    closeHour: number;
    label: string;
  };
  menuSections: MenuSection[];
};

const restaurant: Restaurant = {
  name: 'Harvest Kitchen',
  tagline: 'Seasonal bowls, salads, and thoughtfully sourced plates.',
  rating: 4.8,
  reviewCount: 1200,
  priceLevel: '$$ · Farm-to-table',
  cuisine: ['Californian', 'Vegetarian friendly'],
  etaRange: '20-30 min • 2.4 km',
  heroImage:
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
  hours: {
    openHour: 10,
    closeHour: 22,
    label: '10:00 AM - 10:00 PM',
  },
  menuSections: [
    {
      id: 'chef-specials',
      title: 'Chef Specials',
      description: 'Limited-run plates featuring peak-season produce.',
      items: [
        {
          id: 'heirloom-bowl',
          name: 'Heirloom Grain Bowl',
          description: 'Farro, roasted squash, charred broccolini, citrus tahini.',
          price: 15,
          calories: 640,
          isPopular: true,
          badges: ['Chef favorite'],
          sizes: [
            { id: 'regular', label: 'Regular', priceModifier: 0 },
            { id: 'large', label: 'Large +$3', priceModifier: 3 },
          ],
          extras: [
            { id: 'avocado', label: 'Add avocado', price: 2.5 },
            { id: 'egg', label: 'Jammy egg', price: 1.5 },
          ],
        },
        {
          id: 'wild-salmon',
          name: 'Miso Glazed Salmon',
          description: 'Forbidden rice, ginger glazed carrots, sesame crunch.',
          price: 21,
          calories: 720,
          badges: ['Gluten free'],
          extras: [{ id: 'sauce', label: 'Extra miso glaze', price: 1 }],
        },
      ],
    },
    {
      id: 'cold-pressed',
      title: 'Cold-Pressed Juices',
      description: 'Organic blends bottled each morning.',
      items: [
        {
          id: 'citrus-glow',
          name: 'Citrus Glow',
          description: 'Grapefruit, orange, turmeric, ginger.',
          price: 9,
          extras: [
            { id: 'ginger-shot', label: 'Add ginger shot', price: 2 },
            { id: 'chia', label: 'Chia boost', price: 1 },
          ],
        },
        {
          id: 'green-shield',
          name: 'Green Shield',
          description: 'Kale, spinach, cucumber, mint, lime.',
          price: 9,
        },
      ],
    },
  ],
};

const formatPrice = (value: number) => `$${value.toFixed(2)}`;

const HoursBadge = ({ isOpen, label }: { isOpen: boolean; label: string }) => (
  <View style={[styles.hoursBadge, isOpen ? styles.hoursBadgeOpen : styles.hoursBadgeClosed]}>
    <View style={[styles.statusDot, isOpen ? styles.statusDotOpen : styles.statusDotClosed]} />
    <Text style={[styles.hoursBadgeText, isOpen ? styles.textOpen : styles.textClosed]}>
      {isOpen ? 'Open' : 'Closed'} · {label}
    </Text>
  </View>
);

const RestaurantHero = ({ isOpen }: { isOpen: boolean }) => (
  <View style={styles.heroWrapper}>
    <ImageBackground source={{ uri: restaurant.heroImage }} style={styles.heroImage}>
      <View style={styles.heroOverlay} />
      <SafeAreaView>
        <View style={styles.heroContent}>
          <Text style={styles.heroName}>{restaurant.name}</Text>
          <Text style={styles.heroTagline}>{restaurant.tagline}</Text>
          <View style={styles.heroMetaRow}>
            <Text style={styles.heroMetaText}>
              ⭐️ {restaurant.rating.toFixed(1)} ({restaurant.reviewCount}+)
            </Text>
            <Text style={styles.heroMetaSeparator}>•</Text>
            <Text style={styles.heroMetaText}>{restaurant.priceLevel}</Text>
          </View>
          <Text style={styles.heroMetaSub}>{restaurant.cuisine.join(' · ')}</Text>
          <HoursBadge isOpen={isOpen} label={restaurant.hours.label} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  </View>
);

const MenuItemCard = ({
  item,
  onPress,
}: {
  item: MenuItem;
  onPress: (item: MenuItem) => void;
}) => (
  <Pressable style={styles.menuItemCard} onPress={() => onPress(item)}>
    <View style={{ flex: 1 }}>
      <View style={styles.menuItemHeader}>
        <Text style={styles.menuItemTitle}>{item.name}</Text>
        {item.isPopular && <Text style={styles.popularPill}>Popular</Text>}
      </View>
      <Text style={styles.menuItemDescription}>{item.description}</Text>
      <View style={styles.menuItemFooter}>
        <Text style={styles.menuItemPrice}>{formatPrice(item.price)}</Text>
        {item.calories && <Text style={styles.menuItemMeta}>{item.calories} cal</Text>}
      </View>
      {item.badges && (
        <View style={styles.badgeRow}>
          {item.badges.map((badge) => (
            <Text key={badge} style={styles.itemBadge}>
              {badge}
            </Text>
          ))}
        </View>
      )}
    </View>
    <View style={styles.addButtonContainer}>
      <Pressable style={styles.addButton} onPress={() => onPress(item)}>
        <Text style={styles.addButtonText}>Add</Text>
      </Pressable>
    </View>
  </Pressable>
);

const MenuSectionBlock = ({
  section,
  onAdd,
  onLayout,
}: {
  section: MenuSection;
  onAdd: (item: MenuItem) => void;
  onLayout: (event: NativeSyntheticEvent<LayoutChangeEvent>) => void;
}) => (
  <View onLayout={onLayout} style={styles.menuSection}>
    <Text style={styles.sectionTitle}>{section.title}</Text>
    {section.description && <Text style={styles.sectionDescription}>{section.description}</Text>}
    {section.items.map((item) => (
      <MenuItemCard key={item.id} item={item} onPress={onAdd} />
    ))}
  </View>
);

const ItemDetailModal = ({
  item,
  visible,
  onClose,
}: {
  item: MenuItem | null;
  visible: boolean;
  onClose: () => void;
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (visible && item) {
      setSelectedSize(item.sizes?.[0]?.id ?? null);
      setSelectedExtras({});
    }
  }, [visible, item]);

  if (!item) {
    return null;
  }

  const basePrice = useMemo(() => item.price, [item]);
  const sizeModifier = item.sizes?.find((size) => size.id === selectedSize)?.priceModifier ?? 0;
  const extrasTotal = Object.entries(selectedExtras).reduce((sum, [extraId, checked]) => {
    if (!checked) return sum;
    const extra = item.extras?.find((e) => e.id === extraId);
    return extra ? sum + extra.price : sum;
  }, 0);
  const total = basePrice + sizeModifier + extrasTotal;

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) => ({ ...prev, [extraId]: !prev[extraId] }));
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{item.name}</Text>
            <Pressable hitSlop={16} onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </Pressable>
          </View>
          <Text style={styles.modalDescription}>{item.description}</Text>

          {item.sizes && item.sizes.length > 0 && (
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Choose a size</Text>
              {item.sizes.map((size) => (
                <Pressable
                  key={size.id}
                  style={styles.optionRow}
                  onPress={() => setSelectedSize(size.id)}
                >
                  <View
                    style={[
                      styles.radioOuter,
                      selectedSize === size.id && styles.radioOuterActive,
                    ]}
                  >
                    {selectedSize === size.id && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.optionLabel}>{size.label}</Text>
                  <Text style={styles.optionPrice}>
                    {size.priceModifier === 0 ? 'Included' : `+${formatPrice(size.priceModifier)}`}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          {item.extras && item.extras.length > 0 && (
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Extras</Text>
              {item.extras.map((extra) => (
                <Pressable
                  key={extra.id}
                  style={styles.optionRow}
                  onPress={() => toggleExtra(extra.id)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      selectedExtras[extra.id] && styles.checkboxChecked,
                    ]}
                  >
                    {selectedExtras[extra.id] && <Text style={styles.checkboxTick}>✓</Text>}
                  </View>
                  <Text style={styles.optionLabel}>{extra.label}</Text>
                  <Text style={styles.optionPrice}>{`+${formatPrice(extra.price)}`}</Text>
                </Pressable>
              ))}
            </View>
          )}

          <Pressable style={styles.primaryButton} onPress={onClose}>
            <Text style={styles.primaryButtonText}>Add to order · {formatPrice(total)}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const RestaurantDetailScreen = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const sectionPositions = useRef<Record<string, number>>({});
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const isOpenNow = useMemo(() => {
    const hour = new Date().getHours();
    if (restaurant.hours.openHour < restaurant.hours.closeHour) {
      return hour >= restaurant.hours.openHour && hour < restaurant.hours.closeHour;
    }
    // overnight hours (e.g., 6 PM - 2 AM)
    return hour >= restaurant.hours.openHour || hour < restaurant.hours.closeHour;
  }, []);

  const handleAddPress = (item: MenuItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleSectionLayout = (id: string, event: NativeSyntheticEvent<LayoutChangeEvent>) => {
    sectionPositions.current[id] = event.nativeEvent.layout.y;
  };

  const scrollToSection = (id: string) => {
    const y = sectionPositions.current[id];
    if (typeof y === 'number') {
      scrollRef.current?.scrollTo({ y: Math.max(y - 80, 0), animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
        <RestaurantHero isOpen={isOpenNow} />

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Today&apos;s hours</Text>
          <Text style={styles.infoSubtitle}>{restaurant.hours.label}</Text>
          <Text style={styles.infoMeta}>{restaurant.etaRange}</Text>
        </View>

        <View style={styles.menuNavigationContainer}>
          <Text style={styles.menuNavigationTitle}>View Menu</Text>
          <View style={styles.menuNavigationChips}>
            {restaurant.menuSections.map((section) => (
              <Pressable
                key={section.id}
                style={styles.menuChip}
                onPress={() => scrollToSection(section.id)}
              >
                <Text style={styles.menuChipText}>{section.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>


export default function App() {
  return <RestaurantDetailScreen />;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollContent: {
    paddingBottom: 48,
  },
  heroWrapper: {
    height: 320,
    backgroundColor: '#111',
  },
  heroImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  heroContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 8,
  },
  heroName: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '700',
  },
  heroTagline: {
    color: '#f0f0f0',
    fontSize: 15,
    lineHeight: 20,
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroMetaSeparator: {
    color: '#f0f0f0',
  },
  heroMetaText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  heroMetaSub: {
    color: '#fefefe',
    opacity: 0.9,
  },
  hoursBadge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  hoursBadgeOpen: {
    backgroundColor: 'rgba(84, 214, 44, 0.15)',
  },
  hoursBadgeClosed: {
    backgroundColor: 'rgba(244, 67, 54, 0.15)',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusDotOpen: {
    backgroundColor: '#54d62c',
  },
  statusDotClosed: {
    backgroundColor: '#f44336',
  },
  hoursBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  textOpen: {
    color: '#bff5b1',
  },
  textClosed: {
    color: '#f5b1b1',
  },
  infoCard: {
    marginTop: -32,
    marginHorizontal: 16,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
    gap: 4,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  infoSubtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111',
  },
  infoMeta: {
    color: '#6b6b6b',
  },
  menuNavigationContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
    gap: 12,
  },
  menuNavigationTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  menuNavigationChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  menuChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#111',
  },
  menuChipText: {
    color: '#fff',
    fontWeight: '600',
  },
  menuSection: {
    marginTop: 32,
    paddingHorizontal: 16,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },
  sectionDescription: {
    color: '#6b6b6b',
    marginTop: -8,
  },
  menuItemCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  menuItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  popularPill: {
    fontSize: 11,
    color: '#c2410c',
    backgroundColor: '#fff7ed',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    fontWeight: '600',
  },
  menuItemDescription: {
    color: '#555',
    marginBottom: 6,
  },
  menuItemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 15,
    fontWeight: '700',
  },
  menuItemMeta: {
    color: '#777',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  itemBadge: {
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#eef2ff',
    color: '#3730a3',
    fontWeight: '600',
  },
  addButtonContainer: {
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#111',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 16,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    fontSize: 20,
  },
  modalDescription: {
    color: '#555',
  },
  modalSection: {
    gap: 12,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  optionLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
  },
  optionPrice: {
    color: '#555',
    fontWeight: '600',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#cbd5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: '#111',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#111',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#cbd5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#111',
    borderColor: '#111',
  },
  checkboxTick: {
    color: '#fff',
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: '#111',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
*/
