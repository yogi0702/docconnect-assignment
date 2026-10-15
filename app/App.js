import { useCallback } from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans'

import { colors } from './src/theme/colors'
import HomeScreen from './src/screens/HomeScreen'
import DiscoverScreen from './src/screens/DiscoverScreen'
import HomeOutline from './assets/icons/icon-home-outline.svg'
import HomeFilled from './assets/icons/icon-home-filled.svg'
import SearchOutline from './assets/icons/icon-search-outline.svg'
import SearchFilled from './assets/icons/icon-search-filled.svg'
import SendOutline from './assets/icons/icon-send-outline.svg'

SplashScreen.preventAutoHideAsync()

const Tab = createBottomTabNavigator()

const EmptyScreen = () => null

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  })

  const onLayout = useCallback(() => {
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} onLayout={onLayout}>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.textSecondary,
              tabBarStyle: {
                height: 64,
                paddingTop: 8,
                backgroundColor: colors.white,
                borderTopColor: colors.border,
              },
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, focused }) => {
                  const Icon = focused ? HomeFilled : HomeOutline
                  return <Icon width={28} height={28} color={color} />
                },
              }}
            />
            <Tab.Screen
              name="Discover"
              component={DiscoverScreen}
              options={{
                tabBarIcon: ({ color, focused }) => {
                  const Icon = focused ? SearchFilled : SearchOutline
                  return <Icon width={28} height={28} color={color} />
                },
              }}
            />
            <Tab.Screen
              name="Chat"
              component={EmptyScreen}
              listeners={{ tabPress: (e) => e.preventDefault() }}
              options={{
                tabBarIcon: ({ color }) => <SendOutline width={28} height={28} color={color} />,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  )
}
