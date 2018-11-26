/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createStackNavigator,} from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import MasterMissionsScreen from './components/MasterMissionsScreen';
import EventScreen from './components/EventScreen';
import ServantScreen from './components/ServantsScreen';
import TierListScreen from './components/TierListScreen';
import CraftEssenceScreen from './components/CraftEssencesScreen';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    MasterMission: MasterMissionsScreen,
    Event: EventScreen,
    Servant: ServantScreen,
    TierList: TierListScreen,
    CraftEssence: CraftEssenceScreen
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}