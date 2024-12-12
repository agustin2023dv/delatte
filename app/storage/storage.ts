import { Platform } from 'react-native';
import * as secureStore from './mobileStorage';
import * as localStorage from './webStorage';

const isWeb = Platform.OS === 'web';

export const setItem = isWeb ? localStorage.setItem : secureStore.setItem;
export const getItem = isWeb ? localStorage.getItem : secureStore.getItem;
export const removeItem = isWeb ? localStorage.removeItem : secureStore.removeItem;
