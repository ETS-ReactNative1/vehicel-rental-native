import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function Search() {
  return (
    <View>
    <TextInput
   style={styles.input}
 placeholder="search" />
      <Text>Search</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#DFDEDE',
  },
})
