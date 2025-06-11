import { View, Text } from 'react-native'
import React from 'react'
import RootNavigator from './src/navigation/RootNavigator'
import WelcomePage from './src/screens/welcomePage/WelcomePage'
import LoginPage from './src/screens/loginPage/LoginPage'
import SignupPage from './src/screens/signupPage/SignupPage'
const App = () => {
  return (
    <RootNavigator/>
    //<SignupPage/>
  )
}

export default App