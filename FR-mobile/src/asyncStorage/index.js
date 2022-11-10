import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
  const _value = { ...value }
  try {
    if (_value.restoId) {
      _value["role"] = "kurir"
    } else {
      _value["role"] = "customer"
    }
    console.log(_value, "><><><><><><><><")
    const jsonValue = JSON.stringify(_value)
    await AsyncStorage.setItem('user', jsonValue)
    const user = await AsyncStorage.getItem("user")
    console.log(user, "USERRRRRRRRRRRRRßßßßß");

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


