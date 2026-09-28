import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Filters from '../components/Filters';
import FoodItem from '../components/FoodItem';
import { MENU_ITEMS } from '../data/menuData';

export default function HomeScreen({ navigation, userProfile }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleToggleCategory = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Filtered list based on Search and Selected Categories
  const filteredData = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchSearch =
        searchText.trim() === '' ||
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase());

      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);

      return matchSearch && matchCategory;
    });
  }, [searchText, selectedCategories]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header */}
        <Header
          userProfile={userProfile}
          onProfilePress={() => navigation.navigate('Profile')}
        />

        {/* FlatList with Hero & Filters in ListHeaderComponent */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FoodItem item={item} />}
          ListHeaderComponent={
            <>
              <Hero
                searchText={searchText}
                onSearchChange={setSearchText}
              />
              <Filters
                selectedCategories={selectedCategories}
                onToggleCategory={handleToggleCategory}
              />
            </>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No menu items found</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your search or category filters.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#777777',
    textAlign: 'center',
  },
});
