import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

export default function Onboarding({ onComplete }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  // Email format validation
  const isEmailValid = (text) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim());
  };

  // Name validation: letters only and at least 2 characters
  const isNameValid = (text) => {
    return text.trim().length >= 2 && /^[a-zA-Z\s'-]+$/.test(text.trim());
  };

  const isFormValid = isNameValid(firstName) && isEmailValid(email);

  const handleNext = async () => {
    if (!isFormValid) return;

    try {
      const profile = {
        firstName: firstName.trim(),
        lastName: '',
        email: email.trim().toLowerCase(),
        phoneNumber: '',
        avatar: null,
        orderStatuses: true,
        passwordChanges: true,
        specialOffers: true,
        newsletter: true,
        isOnboarded: true,
      };

      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      await AsyncStorage.setItem('isOnboarded', 'true');

      onComplete(profile);
    } catch (e) {
      console.error('Error saving onboarding data:', e);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Header showProfileIcon={false} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Little Lemon</Text>
            <Text style={styles.heroSubtitle}>Chicago</Text>
            <Text style={styles.heroDescription}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Let us get to know you</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name *</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter your first name"
                placeholderTextColor="#A0A0A0"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#A0A0A0"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
        </ScrollView>

        {/* Footer Next Button */}
        <View style={styles.footer}>
          <Pressable
            style={[
              styles.nextButton,
              !isFormValid && styles.nextButtonDisabled,
            ]}
            disabled={!isFormValid}
            onPress={handleNext}
          >
            <Text
              style={[
                styles.nextButtonText,
                !isFormValid && styles.nextButtonTextDisabled,
              ]}
            >
              Next
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
    backgroundColor: '#EDEFEE',
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    backgroundColor: '#495E57',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F4CE14',
    marginBottom: 2,
  },
  heroSubtitle: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  heroDescription: {
    fontSize: 14,
    color: '#EDEFEE',
    lineHeight: 20,
  },
  formContainer: {
    padding: 24,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#495E57',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#495E57',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
  },
  footer: {
    padding: 20,
    backgroundColor: '#EDEFEE',
  },
  nextButton: {
    backgroundColor: '#F4CE14',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  nextButtonDisabled: {
    backgroundColor: '#D3D3D3',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#495E57',
  },
  nextButtonTextDisabled: {
    color: '#8E8E93',
  },
});
