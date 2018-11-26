import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class TierList extends Component {
     static navigationOptions = {
          title: 'TierList',
     };
     render() {
       return (
         <View style={styles.container}>
               <Text>Tier List Page</Text>
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