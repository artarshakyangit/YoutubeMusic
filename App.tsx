import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {Provider} from "react-redux";
import {createStore} from 'redux';
import {reducer} from "./store/reducers/reducer";
import {AppContext} from "./AppContext";
import {createStackNavigator} from '@react-navigation/stack'
import PlayerWidget from "./components/PlayerWidget";
const store = createStore(reducer);


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

 const [songId, setSongId,] = useState<string|null>(null);
    const Stack = createStackNavigator()
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>

            <AppContext.Provider value={{
                songId,
            setSongId: (id: string)=> setSongId(id),
            }}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
            <PlayerWidget />
            </AppContext.Provider>

      </Provider>


    )
  }

}
