import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import Image360Viewer from '@hauvo/react-native-360-image-viewer'

const { width, height } = Dimensions.get('window')
const images = _.reverse([
  require(`./assets/images/iris-1.jpg`),
  require(`./assets/images/iris-2.jpg`),
  require(`./assets/images/iris-3.jpg`),
  require(`./assets/images/iris-4.jpg`),
  require(`./assets/images/iris-5.jpg`),
  require(`./assets/images/iris-6.jpg`),
  require(`./assets/images/iris-7.jpg`),
  require(`./assets/images/iris-8.jpg`),
  require(`./assets/images/iris-9.jpg`),
  require(`./assets/images/iris-10.jpg`),
  require(`./assets/images/iris-11.jpg`),
  require(`./assets/images/iris-12.jpg`),
  require(`./assets/images/iris-13.jpg`),
  require(`./assets/images/iris-14.jpg`),
  require(`./assets/images/iris-15.jpg`),
  require(`./assets/images/iris-16.jpg`),
  require(`./assets/images/iris-17.jpg`),
  require(`./assets/images/iris-18.jpg`),
  require(`./assets/images/iris-19.jpg`),
  require(`./assets/images/iris-20.jpg`),
  require(`./assets/images/iris-21.jpg`),
  require(`./assets/images/iris-22.jpg`),
  require(`./assets/images/iris-23.jpg`),
  require(`./assets/images/iris-24.jpg`),
  require(`./assets/images/iris-25.jpg`),
  require(`./assets/images/iris-26.jpg`),
  require(`./assets/images/iris-27.jpg`),
  require(`./assets/images/iris-28.jpg`),
  require(`./assets/images/iris-29.jpg`),
  require(`./assets/images/iris-30.jpg`),
  require(`./assets/images/iris-31.jpg`),
  require(`./assets/images/iris-32.jpg`),
  require(`./assets/images/iris-33.jpg`),
  require(`./assets/images/iris-34.jpg`),
  require(`./assets/images/iris-35.jpg`),
  require(`./assets/images/iris-36.jpg`)
])

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Image360Viewer srcset={images} width={width} height={height} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
