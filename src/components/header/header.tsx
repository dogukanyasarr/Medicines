import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { HeaderComponentType } from './type'
import { styles } from './style'
const Header = (props: HeaderComponentType ) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={props.onPress} style={styles.backButton}>
          <Image
            source={require('../../assets/images/back.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{props.text}</Text>
        <Image
          source={require('../../assets/images/user.png')}
          style={styles.userIcon}
          resizeMode="contain"
        />
    </View>
  )
}

export default Header