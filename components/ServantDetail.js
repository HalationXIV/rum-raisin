import React, {Component} from 'react';
import {Image, View, StyleSheet, Text, FlatList, AsyncStorage} from 'react-native';
import {separateJapanese, cheerio} from './Globals';

export default class ServantDetailScreen extends Component{
     static navigationOptions = {
          title: 'Detail Servant',
     };

     state = {

     }

     fetchData = async(servantUrl) =>{
          console.log(servantUrl);
          const searchUrl = 'https://fate-go.cirnopedia.org/' + servantUrl;
          const response = await fetch(searchUrl);   // fetch page
          
          const htmlString = await response.text();  // get response text
          const $ = cheerio.load(htmlString);
     
          const table = $('table#rounded-corner');
     }

     componentDidMount(){
          const {navigation} = this.props;
          const servantUrl = navigation.getParam('servantUrl', 'https://fate-go.cirnopedia.org/servant.php');
          const servantImageUrl = navigation.getParam('servantImageUrl', 'poi');
          
          this.fetchData(servantUrl);
     }

     // render() {
     //      const {navigation} = this.props;
     //      const servantName = navigation.getParam('servantName', 'Nep');
     //      const servantID = navigation.getParam('servantID', '0');
     //      const servantClass = navigation.getParam('servantClass', 'Shielder');
     //      const servantUrl = navigation.getParam('servantUrl', 'https://fate-go.cirnopedia.org/servant.php');
     //      return (
     //      <View style={styles.container}>
     //           <Text>Detail Screen</Text>
     //           <Text>Servant ID   : {JSON.stringify(servantID)}</Text>
     //           <Text>Servant Name : {JSON.stringify(servantName)}</Text>
     //           <Text>Servant Class : {JSON.stringify(servantClass)}</Text>
     //           <Text>Servant Url : {JSON.stringify(servantUrl)}</Text>
     //      </View>
     //      );
     // }
     render(){
          const {navigation} = this.props;
          const servantUrl = navigation.getParam('servantUrl', 'https://fate-go.cirnopedia.org/servant.php');
          const servantImageUrl = navigation.getParam('servantImageUrl', 'poi');
          return (
               <View style={styles.container}>
                    <Text>Nep</Text>
               </View>
          )
     }
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          flexDirection:'column',
          backgroundColor: '#C7EAE4',
          paddingTop: 10
     },
});