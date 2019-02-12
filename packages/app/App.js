import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { add } from '@yarn-workspace-cra-crna-expo-tut/common';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>React Native is like doing 1 + 1 = {add(1,1)}!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
