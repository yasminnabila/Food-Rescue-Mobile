import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  role: "",
  user: {},
  basket: [
    // { name: "coca-cola", qty: 1, id: 1 },
    // { name: "Fanta", qty: 1, id: 2 }
  ],
  delivery: "Delivery",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    addBasket: (state, action) => {
      const item = state.basket.filter((el) => el.id === action.payload.id);
      if (item.length > 0) {
        const idx = state.basket.findIndex((el) => el.id === action.payload.id);
        state.basket[idx].qty++;
      } else {
        state.basket = [...state.basket, action.payload];
      }
    },
    inc_basket: (state, action) => {
      state.basket[action.payload].qty++;
    },
    dec_basket: (state, action) => {
      const item = { ...state.basket[action.payload] };
      item.qty--;
      state.basket[action.payload].qty--;
      if (item.qty < 1) {
        state.basket = state.basket.filter((el) => el.id !== item.id);
      }
    },
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setDelivery: (state, action) => {
      state.delivery = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  setIsLogin,
  inc_basket,
  dec_basket,
  addBasket,
  setDelivery,
  setOrigin,
  setDestination,
  setTravelTimeInformation,
  setRole,
} = userSlice.actions;

export const selectIsLogin = (state) => state.user.isLogin;
export const selectRole = (state) => state.user.role;
export const selectOrigin = (state) => state.user.origin;
export const selectDestination = (state) => state.user.destination;
export const selectTravelTimeInformation = (state) =>
  state.user.travelTimeInformation;

export const checkOut =
  ({ totalMoney, basket, delivery }) =>
  (dispatch) => {
    setTimeout(() => {
      console.log({ totalMoney, order: basket, delivery });
    }, 1000);
  };

export default userSlice.reducer;
export const selectDelivery = (state) => state.user.delivery;
