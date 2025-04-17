// utils/secureStore.ts
import * as SecureStore from 'expo-secure-store';

const API_KEYS_KEY = 'api_keys';

export async function saveApiKey(label: string, key: string, service: string) {
  const existing = await getAllApiKeys();
  existing[label] = { key, service };
  await SecureStore.setItemAsync(API_KEYS_KEY, JSON.stringify(existing));
}

export async function getAllApiKeys(): Promise<{ [label: string]: { key: string, service: string } }> {
  const stored = await SecureStore.getItemAsync(API_KEYS_KEY);
  return stored ? JSON.parse(stored) : {};
}

export async function deleteApiKey(label: string) {
  const keys = await getAllApiKeys();
  delete keys[label];
  await SecureStore.setItemAsync(API_KEYS_KEY, JSON.stringify(keys));
}
