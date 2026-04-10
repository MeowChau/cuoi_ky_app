/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { registerDependencies } from './src/di/registerDependencies';

registerDependencies();

AppRegistry.registerComponent(appName, () => App);
