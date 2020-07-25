import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/images/logo.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 80
  },
});

export default memo(Logo);
