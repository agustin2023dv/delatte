import { Platform } from 'react-native';
import * as secureStore from './mobileStorage';
import * as localStorage from './webStorage';

const isWeb = typeof Platform !== 'undefined' && Platform.OS === 'web';
console.log("Storage en uso:", isWeb ? "webStorage" : "mobileStorage");

export const setItem = isWeb ? localStorage.setItem : secureStore.setItem;
export const getItem = isWeb ? localStorage.getItem : secureStore.getItem;
export const removeItem = isWeb ? localStorage.removeItem : secureStore.removeItem;
