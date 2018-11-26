import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Dimensions} from 'react-native';
import {Container, List, Content, ListItem} from 'native-base';
import {separateJapanese, cheerio} from './Globals';
import ProgressBarAnimated from 'react-native-progress-bar-animated';


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
      progress: 0,
     };

     fetchData = async () =>{
      this.setState({progress:this.state.progress + 10});
      const searchUrl = 'https://fate-go.cirnopedia.org/servant.php';
      const response = await fetch(searchUrl);   // fetch page
      
      const htmlString = await response.text();  // get response text
      const $ = cheerio.load(htmlString);

      const table = $('table#rounded-corner');
      const tableBody = $(table[1]).find('tbody');
      const tr = $(tableBody).find('tr');
      
      const tempArr = [];
      this.setState({progress:this.state.progress + 30});
      $(tr).each(function(i, elem){
        const td = $(this).find('td');
        //for a while just saber class
        const realTd = $(td[3]).text();
        tempArr.push({key: i, value:separateJapanese(realTd)});
      });
      this.setState({data : tempArr});
      this.setState({progress:100});
     }

     componentDidMount(){
      //console.log(GLOBALS.BASE_URL);
      this.fetchData();
     }

     loadData = () =>{
       
        return (this.state.data.map(y => (
          <ListItem key={y.key}>
            <Text>{y.value.eng}</Text>
          </ListItem>
        )))
      }

     render() {
      const barWidth = Dimensions.get('screen').width - 30;
       return (
        <Container>
          <Content padder>
          <ProgressBarAnimated
            width={barWidth}
            value={this.state.progress}
            backgroundColorOnComplete="#6CC644"
          />
            <List>
              {this.loadData()}
            </List>
          </Content>
        </Container>
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
          backgroundColor: '#C7EAE4'
     },
});