import {Navigation} from 'react-native-navigation';

import Connect from './Connect';
import Devices from './Devices';
import AddDevice from './AddDevice';

export function registerScreens() {
  Navigation.registerComponent(`Connect`, () => Connect);
  Navigation.registerComponent(`Devices`, () => Devices);
  Navigation.registerComponent(`AddDevice`, () => AddDevice);
}
