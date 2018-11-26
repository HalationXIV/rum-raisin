import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import MainButton from './MainButton';


export default class HomeScreen extends Component {
     static navigationOptions = {
          title: 'Home',
     };

     render() {
     const {navigation} = this.props;
       return (
         <View style={styles.container}>
           <MainButton ButtonName="Master Missions" navigation = {navigation} destination="MasterMission" />
           <MainButton ButtonName="Servants" navigation = {navigation} destination="Servant"/>
           <MainButton ButtonName="Craft Essences" navigation = {navigation} destination="CraftEssence"/>
           <MainButton ButtonName="Events" navigation = {navigation} destination="Event"/>
           <MainButton ButtonName="Tier List" navigation = {navigation} destination="TierList"/>
           <MainButton ButtonName="FAQ" navigation = {navigation} destination="Faq"/>
         </View>
       );
     }
}
   
const styles = StyleSheet.create({
     container: {
          flex: 1,
          paddingTop: 50,
          flexDirection:'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          //backgroundColor: '#124E78'
          backgroundColor: '#C7EAE4'
     },
});