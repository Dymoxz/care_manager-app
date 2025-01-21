import '../tamagui-web.css'

import { useEffect } from 'react'
import {Dimensions, ImageBackground, StatusBar, useColorScheme} from 'react-native'
import StackNavigator from './navigation/StackNavigator';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Provider } from './Provider'
import { useTheme, View } from 'tamagui'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  if (!interLoaded && !interError) {
    return null
  }

  return (
      <ImageBackground
          source={require('../assets/images/backdrop.png')} // Zorg ervoor dat het pad correct is
          style={{ flex: 1, zIndex: 0}}
          imageStyle={{ width: screenWidth, height: screenHeight, resizeMode: 'cover' }}
      >
        <View style={{ flex: 1, zIndex: 1 }}>
          <Providers>
            <RootLayoutNav />
          </Providers>
        </View>
      </ImageBackground>
  )
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const theme = useTheme()
  return (
      <StackNavigator />
  )
}