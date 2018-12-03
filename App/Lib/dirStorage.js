import { Platform } from 'react-native';
const RNFS = require('react-native-fs');

export const dirHome = Platform.select({
  ios: `${RNFS.DocumentDirectoryPath}/mobileinspection`,
  android: `${RNFS.ExternalDirectoryPath}/mobileinspection`
});

export const dirPicutures = `${dirHome}/Pictures`;
export const dirAudio = `${dirHome}/Audio`;