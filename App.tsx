/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Dimensions, Text, View} from 'react-native';

const DeviceHeightRatio = Dimensions.get('window').height;

function App(): React.JSX.Element {
  return (
    <View style={{height: DeviceHeightRatio, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 14}}>app</Text>
    </View>
  );
}

export default App;
