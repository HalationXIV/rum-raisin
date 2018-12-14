import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Container, Header, Content, List, ListItem} from 'native-base';
import {separateJapanese, cheerio} from './Globals';

export default class MasterMissions extends React.Component {
     static navigationOptions = {
          title: 'Master Missions',
     };
     constructor(props){
       super(props);
       
     }
     state = {data : [], 
              dataReal: [{key: -1, value: [{jap: "asd"}, {eng: "test"}]}],
              startTime: "",
              endTime: ""
            };

     fetchData = async () =>{
      const searchUrl = 'https://fate-go.cirnopedia.org/master_mission.php';
      const response = await fetch(searchUrl);   // fetch page
  
      const htmlString = await response.text();  // get response text
      const $ = cheerio.load(htmlString);

      const table = $('table#rounded-corner');
      const tableBody = $(table[0]).find('tbody');
      const tr = $(tableBody).find('tr');

      const tempArr = [];
      var cnt = 0;
      $(tr).each(function(i, elem){
        $(this).find('td').each(function(k, elem2){
      
          if(k == 1){
            tempArr.push({key: cnt, value: separateJapanese($(this).text())});
            cnt++;
          }
        });
      });
      this.setState({dataReal : tempArr});
      console.log(this.state.dataReal);
     }

     getDate = () =>{
        const curDate = new Date().getDate();
        this.setState({startTime: curDate});
     }

     componentDidMount(){
      //this.setState({endTime: "November 4, 2018 (Sun) 23:59"});
      //this.getDate();
      this.fetchData();
     }

     renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "86%",
            backgroundColor: "#CED0CE",
            marginLeft: "14%"
          }}
        />
      );
    };

     searchFilterFunction = () =>{

     }

     renderHeader = () =>{
       return(
        <SearchBar 
          placeholder = "Search Here..."
          lightTheme        
          round        
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}       
        />
       )
     }

     loadData = () =>{
        return (<List><FlatList 
                  data={this.state.dataReal} 
                  renderItem={({item}) =>(
                    <ListItem>
                      <Text style={styles.missions}>{item.value.eng}</Text>
                    </ListItem>)}
                  keyExtractor = {item => item.key.toString()}  
                  ItemSeparatorComponent = {this.renderSeparator}
                  />
                </List>
                );
        // return (this.state.dataReal.map(y => (
        //   <ListItem key={y.key}>
        //     <Text style={styles.missions}>{y.value.eng}</Text>
        //   </ListItem>
        // )))
     }
     
     render() {
       return (
         <View style={styles.container}>
          <Text style={styles.headerText}>Reward: 3x Saint Quartz Fragment (s)</Text>
           {this.loadData()}
         </View>
       );
     }
}
   
const styles = StyleSheet.create({
     container: {
          flex: 1,
          flexDirection:'column',
          //justifyContent: 'center',
          //alignItems: 'center',
          backgroundColor: '#C7EAE4',
          paddingTop: 15
     },
     missions:{
      fontSize:16,
      color: '#5B616A',
     },
     headerText:{
       fontSize: 20,
       padding: 5,
       color: '#FFFAE3',
       borderRadius: 5,
       marginLeft:5,
       marginRight: 5,
       backgroundColor: '#8FBFE0',
       //alignItems:''
     }
});