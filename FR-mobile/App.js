import Navigation from './src/navigations/botNavigation';
import { Provider } from 'react-redux'
import { store } from './src/store/masterStore.js'

export default function App() {

  return (
    <>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
}

