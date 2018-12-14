import React, {Component} from 'react';
import {Image, View, StyleSheet, Text, SectionList, FlatList, AsyncStorage, TouchableHighlight} from 'react-native';
import {Container, List, Content, ListItem} from 'native-base';
import {separateJapanese, cheerio, BaseUrl} from './Globals';
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
      isExists: false,
      classList: [
        {id: 0, class: "Shielder"},
        {id: 1, class: "Saber"},
        {id: 2, class: "Archer"},
        {id: 3, class: "Lancer"},
        {id: 4, class: "Rider"},
        {id: 5, class: "Caster"},
        {id: 6, class: "Assassin"},
        {id: 7, class: "Berseker"},
        {id: 8, class: "Ruler"},
        {id: 9, class: "Avenger"},
        {id: 10, class: "Alter Ego"},
        {id: 11, class: "Moon Cancer"},
        {id: 12, class: "Foreigner"},
      ]
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

    if(retrievedData != null && retrievedData != ""){
      this.setState({data : retrievedData});
      this.setState({filteredData : retrievedData});
      //await this.removeItem("ServantList");
    } else{
      var count = 0;
      const searchUrl = BaseUrl + 'servant.php';
      const response = await fetch(searchUrl);   // fetch page
      
      const htmlString = await response.text();  // get response text
      const $ = cheerio.load(htmlString);
  
      const table = $('table#rounded-corner');
      const tempArr = [];
      const tempClassList = this.state.classList;
      $(table).each(function(i, elem){
        //bcoz only 13 class exists
        if(i <= 12){
          const tableBody = $(table[i]).find('tbody');
          const tr = $(tableBody).find('tr');
          //this.setState({progress:this.state.progress + 30});
          $(tr).each(function(j, elem){
            const td = $(this).find('td');
            const realTd = $(td[3]).text();
            const Url = $(td[3]).find('a').attr('href');

            //image Url
            const a = $(td[2]).find('a');
            const divImage = $(td[2]).find('div.large');
            const imageUrls = $(divImage).css('background-image');

            const datas = imageUrls.split("url('");
            const imageCollectionUrl = [];
            
            for(var d in datas){
              if(datas[d].trim() != ""){
                var ImageUrl = BaseUrl + datas[d].trim();
                var tempImgUrl = "";
                
                if(ImageUrl.slice(-3) == "'),"){
                  tempImgUrl = ImageUrl.substr(0, ImageUrl.length - 3);
                }
                if(ImageUrl.slice(-2) == "')"){
                  tempImgUrl = ImageUrl.substr(0, ImageUrl.length - 2);
                }
                
                imageCollectionUrl.push({imageUrl: tempImgUrl});
              }
            }

            tempArr.push({key: count, 
                          value:separateJapanese(realTd), 
                          className: tempClassList[i].class, 
                          servantUrl: Url,
                          imageUrl: imageCollectionUrl});
            count++;
          });
        }
        
      });
      await this.storeItem("ServantList", tempArr);
      this.setState({data : tempArr});
      this.setState({filteredData : tempArr});
    }
    
    console.log(this.state.filteredData);
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
         platform="ios"
          inputContainerStyle={{ backgroundColor: 'white' }}
          containerStyle={{ backgroundColor: '#8FBFE0', marginBottom: 10 }}
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

    pressDetail = (ServantID, ServantName, ClassName, ServantUrl, ServantImageUrl) =>{
      this.props.navigation.navigate('ServantDetail', {
        servantID: ServantID,
        servantName: ServantName,
        className: ClassName,
        servantUrl: ServantUrl,
        servantImageUrl: ServantImageUrl
      });
    }

    //FlatList
    // loadData = () =>{
    // return (<List>
    //           <FlatList 
    //           data={this.state.filteredData} 
    //           renderItem={({item}) =>(
    //               <ListItem title='Poi'>
    //                 <TouchableHighlight onPress={() => this.pressDetail(item.key.toString(), item.value.eng)}>
    //                   <Text style={styles.servantList}>{item.value.eng}</Text>
    //                 </TouchableHighlight>
    //               </ListItem>
    //             )}
    //           keyExtractor = {item => item.key.toString()}  
              // ItemSeparatorComponent = {this.renderSeparator}
              // ListHeaderComponent = {this.renderHeader}
    //           />
    //         </List>
    //       );
    // }

    selectionList = (ClassName) =>{
      const filteredData = this.state.data.filter(item =>{
        return item.className == ClassName;
      });
      return filteredData;
    }

    getSections = () =>{
      var tempSections = [];
      var classList = this.state.classList;
      for(var i=0;i<classList.length;i++){
        tempSections.push({title: classList[i].class, data: this.selectionList(classList[i].class)});
      }
      if(this.state.filteredData[0] != null){
        console.log(this.state.filteredData[0].imageUrl[2]);
      }
      
      return tempSections;
      
    }

    //SectionList
    loadData = () =>{
      return (<List>
                <SectionList 
                data={this.state.filteredData} 
                sections = {this.getSections()}
                renderItem={({item}) =>(
                    <ListItem title='Poi' style={styles.listItem}>
                      <TouchableHighlight onPress={() => 
                            this.pressDetail(item.key.toString(), item.value.eng, item.className, item.servantUrl, item.imageUrl[2])}>
                        <Text style={styles.servantList}>{item.value.eng}</Text>
                      </TouchableHighlight>
                      <Image style={{width: 50, height: 50}} source = {{uri: item.imageUrl[2].imageUrl.toString()}}/>
                    </ListItem>
                  )}
                keyExtractor = {item => item.key.toString()}  
                renderSectionHeader = {({section}) => <Text style={styles.SectionHeader}>{section.title}</Text>}
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
      );
    }
}
   
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#C7EAE4',
      paddingTop: 10
    },
    servantList:{
      fontSize:16,
      color: '#5B616A',
    },
    SectionHeader:{
      fontSize:20,
      color: '#FFFAE3',
      padding: 5,
      backgroundColor: '#8FBFE0',
    },
    listItem:{
      alignItems: 'center',
      justifyContent: 'space-between'
    }
});