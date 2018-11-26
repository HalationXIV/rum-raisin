import React, {Component} from 'react';
import {Platform, View, StyleSheet, Text, Dimensions, FlatList, AsyncStorage} from 'react-native';
import {Container, List, Content, ListItem} from 'native-base';
import {separateJapanese, cheerio} from './Globals';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import {SearchBar, Button} from 'react-native-elements';


export default class Servant extends Component {
    constructor(props){
      super(props);
      
    }
    static navigationOptions = {
        title: 'Servants',
    };

    state = {
      isLoading: false,
      data: [],
      filteredData: [],
      progress: 0,
      isExists: false
    };

    retrieveItem = async (key) => {
      try{
        const retrievedItem = await AsyncStorage.getItem(key);
        const item = JSON.parse(retrievedItem);
        return item;
      }catch(error){
        console.log(error);
      }

      return;
    }

    storeItem = async(key, item) =>{
      try{
        await AsyncStorage.setItem(key, JSON.stringify(item));
        return true;
      }catch(error){
        console.log(error);
        return false;
      }
    }

    removeItem = async(key) =>{
      try{
        await AsyncStorage.removeItem(key);
        return true;
      }catch(error){  
        console.log(error);
        return false;
      }
    }

    fetchData = async () =>{
    this.setState({isLoading: true});
    
    var retrievedData = await this.retrieveItem("ServantList");
    console.log(retrievedData);
    if(retrievedData != null && retrievedData != ""){
      this.setState({data : retrievedData});
      this.setState({filteredData : retrievedData});
      //await this.removeItem("ServantList");
    } else{
      var count = 0;
      const searchUrl = 'https://fate-go.cirnopedia.org/servant.php';
      const response = await fetch(searchUrl);   // fetch page
      
      const htmlString = await response.text();  // get response text
      const $ = cheerio.load(htmlString);
  
      const table = $('table#rounded-corner');
      const tempArr = [];
      $(table).each(function(i, elem){
        const tableBody = $(table[i]).find('tbody');
        const tr = $(tableBody).find('tr');
        
        //this.setState({progress:this.state.progress + 30});
        //i == 3 == lancer only
        $(tr).each(function(j, elem){
          const td = $(this).find('td');
          //for a while just saber class
          const realTd = $(td[3]).text();
          tempArr.push({key: count, value:separateJapanese(realTd)});
          count++;
        });
      });
      await this.storeItem("ServantList", tempArr);
      this.setState({data : tempArr});
    }

    this.setState({progress:100});
    this.setState({isLoading: false});
    }

    componentDidMount(){
      this.fetchData();
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
      );
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

    searchFilterFunction = (text) =>{
      const filteredData = this.state.data.filter(item => {
        const itemData = `${item.value.eng}`;
        return itemData.indexOf(text) > -1;
      });
      this.setState({filteredData: filteredData});
    }

    loadData = () =>{
    return (<List>
              <FlatList 
              data={this.state.filteredData} 
              renderItem={({item}) =>(
                <ListItem title='Poi'>
                  <Text style={styles.servantList}>{item.value.eng}</Text>
                </ListItem>)}
              keyExtractor = {item => item.key.toString()}  
              ItemSeparatorComponent = {this.renderSeparator}
              ListHeaderComponent = {this.renderHeader}
              />
            </List>
          );
    }

    render() {
      return (
      <View style={styles.container}>
        {this.loadData()}
      </View>
      // <Container>
      //   <Content padder>
      //   <ProgressBarAnimated
      //     width={barWidth}
      //     value={this.state.progress}
      //     backgroundColorOnComplete="#6CC644"
      //   />
      //     <List>
      //       {this.loadData()}
      //     </List>
      //   </Content>
      // </Container>
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
    servantList:{
      fontSize:16,
      color: '#5B616A',
     },
});