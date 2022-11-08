import { createSlice } from '@reduxjs/toolkit'
import { getData, storeData } from '../../asyncStorage'

const initialState = {
  isLogin: false,
  user: {},
  basket: [
    // { name: "coca-cola", qty: 1, id: 1 },
    // { name: "Fanta", qty: 1, id: 2 }
  ],
  delivery: "Delivery",
  userData: {},
  isPaid: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    setTodos: (state, action) => {
      state.todos = action.payload
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    addBasket: (state, action) => {
      const item = state.basket.filter(el => el.id === action.payload.id)
      if (item.length > 0) {
        const idx = state.basket.findIndex(el => el.id === action.payload.id)
        state.basket[idx].qty++
      } else {
        state.basket = [...state.basket, action.payload]
      }
    },
    inc_basket: (state, action) => {
      state.basket[action.payload].qty++
    },
    dec_basket: (state, action) => {
      const item = { ...state.basket[action.payload] }
      item.qty--
      state.basket[action.payload].qty--
      if (item.qty < 1) {
        state.basket = state.basket.filter(el => el.id !== item.id)
      }
    },
    setDelivery: (state, action) => {
      state.delivery = action.payload
    },
    clearBasket: (state, action) => {
      state.basket = []
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    clearUser: (state) => {
      state.user = {}
    },
    setIsPaid: (state, action) => {
      state.isPaid = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setIsLogin, inc_basket, dec_basket, addBasket, setDelivery, clearBasket, setUser, clearUser, setUserData, setIsPaid } = userSlice.actions



export const checkOut = ({ total, basket, delivery, access_token }) => async (dispatch) => {
  console.log("MASUK ACT")

  const totalPrice = +Number(total)
  console.log(totalPrice)

  const order = basket.map((el) => {
    return { qty: el.qty, FoodId: el.id, itemPrice: el.price * el.qty * el.discount / 100 }
  })
  console.log(order)

  try {
    const { access_token } = await getData()
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: access_token
      },
      body: JSON.stringify({ total: totalPrice, order, is_delivery: delivery })
    };

    let response = await fetch(`https://savvie.herokuapp.com/checkout`, requestOptions)

    let res = await response.json()

    dispatch(setIsPaid(true))

  } catch (error) {
    console.log(error)
  }

  // setTimeout(() => {
  //   console.log({ total, order: basket, is_delivery: delivery })
  // }, 1000)
}

export const login = (data) => async dispatch => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    let response = await fetch(`https://savvie.herokuapp.com/signIn`, requestOptions)

    let res = await response.json()
    console.log(res)
    storeData(res)
  } catch (error) {
    console.log(error)
  }
}

export const getUserData = () => async dispatch => {
  try {
    const { access_token } = await getData()
    console.log(access_token, "ini di slice ")
    const response = await fetch("https://savvie.herokuapp.com/", {
      headers: {
        access_token: access_token
      }
    })
    const res = await response.json()

    dispatch(setUserData(res))

  } catch (error) {
    console.log(error)
  }
}

export const getUserHistory = () => async dispatch => {
  try {
    const response = await fetch("https://savvie.herokuapp.com/history", {
      headers: {
        access_token: access_token
      }
    })
  } catch (error) {

  }
}

export const selectIsLogin = (state) => state.user.isLogin
export const selectDelivery = (state) => state.user.delivery
export const selectUser = (state) => state.user.user
export const selectUserData = (state) => state.user.userData
export const selectIsPaid = (state) => state.user.isPaid

export default userSlice.reducer