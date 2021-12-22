import * as SecureStore from "expo-secure-store";

const saveItem = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
}

const getItemFromStore = async(key: string) => {
    let result = await SecureStore.getItemAsync(key);
    if(!result) {
        return null;
    }

    return result;
}

const removeItemFromStore = async(key: string) => {
    await SecureStore.deleteItemAsync(key);
}

export {
    saveItem,
    getItemFromStore,
    removeItemFromStore,
}