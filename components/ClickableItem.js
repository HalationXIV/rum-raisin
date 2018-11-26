import React from 'react';
import {View, StyleSheet, Button, TouchableOpacity, Text} from 'react-native';

const ClickableItem = props =>{
     return(
          <View style={styles.subContainer}>
               <TouchableOpacity style={styles.box} onPress={()=> {
                         props.navigation.navigate(props.destination)
                    }}>
                    <Text style={styles.textStyle}>{props.ButtonName}</Text>
               </TouchableOpacity>
          </View>
     );
}



const styles = {
     box: {
          justifyContent: 'center',
          alignItems: 'center',
          //backgroundColor: '#D7FFAB',
          flex:1
     },
     subContainer:{
          width:'50%',
          height: '30%',
          backgroundColor: '#8FBFE0',
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius:10,
          borderWidth:1,
          borderWidth:2,
          borderColor:'rgba(0,0,0,.3)',
          display: 'flex',
     },
     textStyle:{
          fontSize:25,
          color: '#FFFAE3',
     }
}

export default ClickableItem;