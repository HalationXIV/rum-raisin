export default {
     STORE_KEY: 'a56z0fzrNpl^2',
     BASE_URL: 'http://someurl.com',
     COLOR: {
       ORANGE: '#C50',
       DARKBLUE: '#0F3274',
       LIGHTBLUE: '#6EA8DA',
       DARKGRAY: '#999',
     }
};

export const cheerio = require('react-native-cheerio'); 

export function separateJapanese(str){
     var arr = [{jap: "", eng: ""}];
     
     var len = str.length;
     var flag = 0;
     for(var i=0;i<len;i++){
       if(flag == 0){
         if((str[i] >= 'A' && str[i] <= 'Z') || (str[i] >= 'a' && str[i] <= 'z')) flag = 1;
       }
   
       if(flag == 0){
         arr[0].jap += str[i];
       }
   
       if(flag == 1){
         arr[0].eng += str[i];
       }
   
     }
     arr[0].eng = arr[0].eng.trim();
     arr[0].jap = arr[0].jap.trim();
     return arr[0];
   }