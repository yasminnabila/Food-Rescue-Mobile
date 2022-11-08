import AsyncStorage from '@react-native-async-storage/async-storage';


const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('user', jsonValue)
  } catch (e) {
    // saving error
  }
}


const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}

export {
  getData,
  storeData
}


