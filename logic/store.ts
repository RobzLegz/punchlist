import * as SecureStore from "expo-secure-store";

const saveItem = async (key: string, value: string | number | object | string[] | number[] | object[]) => {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
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