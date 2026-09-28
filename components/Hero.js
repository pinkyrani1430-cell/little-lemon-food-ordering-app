import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';

export default function Hero({ searchText, onSearchChange }) {
  return (
    <View style={styles.heroContainer}>
      <Text style={styles.title}>Little Lemon</Text>
      <Text style={styles.subtitle}>Chicago</Text>

      <View style={styles.row}>
        <Text style={styles.description}>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </Text>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300',
          }}
          style={styles.heroImage}
        />
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={onSearchChange}
          placeholder="Search the menu..."
          placeholderTextColor="#8E8E93"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    backgroundColor: '#495E57',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#F4CE14',
  },
  subtitle: {
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  description: {
    flex: 1,
    color: '#EDEFEE',
    fontSize: 14,
    lineHeight: 20,
    paddingRight: 10,
  },
  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 42,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
});
