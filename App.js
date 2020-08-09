import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';


export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
    text:'',
    isSearchPressed:false,
    word:"",
    lexicalCategory:'',
    examples:[],
    definition:""
    };
  }

  getWord=(word)=>{
    var url="https://whitehat-dictionary.glitch.me/?word="+word
    return fetch(url)
    .then((data)=>{
      return data.json()
    }) 
    .then((response)=>{
      var responseObject=JSON.parse(response);
      var word=responseObject.word
      var lexicalCategory=responseObject.results[0].lexicalEntries[0].lexicalCategory.text
      var definition=responseObject.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]

      this.setState({
        "word" : word.trim(),
        "lexicalCategory" : lexicalCategory === undefined ? "" : lexicalCategory.trim(),
        "definition" : definition === undefined ? "" : definition.trim(),
      })
    })
  }

  render() {
    return (
      <View style={styles.heading}>

        <TextInput
        style={styles.inputBox}
        onChangeText={text => {
          this.setState({
            text:text,
            isSearchPressed:false,
            word:"loading...",
            lexicalCategory:'',
            examples:[],
            definition:""
          });
        }}
        value={this.state.text}
      ></TextInput>
      <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            this.setState({isSearchPressed:true});
            this.getWord(this.state.text)
          }}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <View>
          <Text>
            Word:{""}
          </Text>
          <Text style={{fontSize:18}}>
            {this.state.word}
          </Text>
        </View>

        <View>
          <Text>
            Type:{""}
          </Text>
          <Text style={{fontSize:18}}>
            {this.state.lexicalCategory}
          </Text>
        </View>

        <View>
          <Text>
            Definition:{""}
          </Text>
          <Text style={{fontSize:18}}>
            {this.state.definition}
          </Text>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
   goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    backgroundColor:'grey'
  }
});
