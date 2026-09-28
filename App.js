import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Onboarding from './screens/Onboarding';
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Check onboarding status on app launch
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const storedOnboarded = await AsyncStorage.getItem('isOnboarded');
        const storedProfile = await AsyncStorage.getItem('userProfile');

        if (storedOnboarded === 'true' && storedProfile) {
          setIsOnboarded(true);
          setUserProfile(JSON.parse(storedProfile));
        } else {
          setIsOnboarded(false);
        }
      } catch (e) {
        console.error('Failed to load user state from AsyncStorage:', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#495E57" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {isOnboarded ? (
          <>
            <Stack.Screen name="Home">
              {(props) => (
                <HomeScreen
                  {...props}
                  userProfile={userProfile}
                  onUpdateProfile={setUserProfile}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Profile">
              {(props) => (
                <Profile
                  {...props}
                  userProfile={userProfile}
                  onUpdateProfile={setUserProfile}
                  onLogout={() => {
                    setIsOnboarded(false);
                    setUserProfile(null);
                  }}
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Onboarding">
            {(props) => (
              <Onboarding
                {...props}
                onComplete={(profile) => {
                  setUserProfile(profile);
                  setIsOnboarded(true);
                }}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEFEE',
  },
});
