import React, { FC , useEffect ,useState} from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle , FlatList,
  TextInput,Text,ImageBackground, Platform} from "react-native"
import {  StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
// import { Api } from "../../services/api"
// import { save } from "../../utils/storage"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { spacing } from "../../theme"
import {
  Header,
} from "../../components"
// import { GradientBackground } from "../../components/gradient-background/gradient-background"


const FULL: ViewStyle = { flex: 1 }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
  marginTop:10,
  marginLeft:10
}
const HEADER_TITLE: TextStyle = {
  fontSize: 24,
  paddingTop:15,
  fontWeight:'bold',
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
  color:"#411292",
  borderColor:'#7120E5',
  borderWidth:  2,
  marginLeft:15,
  borderRadius:8,
  height:34,
  backgroundColor:'#cccccc',
  opacity:1,
  overflow:'hidden'
}
 const textInputStyle: TextStyle = {
  height: 40,
  borderWidth: 1,
  paddingLeft: 20,
  margin: 5,
  borderColor: '#009688',
  backgroundColor: '#FFFFFF',
  borderRadius:8,
  
}
const  itemStyle:TextStyle= {
  padding: 10,
  color:'#411292',
  fontSize:18,
  fontFamily: Platform.select({
    ios: "RobotoMono-MediumItalic", // The font family name
    android: "RobotoMono-MediumItalic", // The file name
  })
}

const card:ViewStyle ={
  shadowColor: '#6E19EA',
  shadowOpacity: 0.26,
  shadowRadius: 6,
  shadowOffset: {width: 0, height: 2},
  backgroundColor: '#cccccc',
  elevation: 10,
  padding: 20,
  borderRadius: 10,
  width:'85%',
  marginLeft:28,
  marginTop:10

}


export const HomeScreen:FC<StackScreenProps<NavigatorParamList, "home">> = observer(
    ({ navigation }) => {
      const goBack = () => navigation.goBack()
      // const nextScreen = () => navigation.navigate("main")
      const [search, setSearch] = useState('');
const Array = [
  {
    title: 'Lahore',
    id: 1,
  },
  {
    title: 'Rawalpindi',
    id: 2,
  },
  {
    title: 'Islamabad',
    id: 3,
  },
  {
    title: 'London',
    id: 4,
  },
  {
    title: 'Rawat',
    id: 5,
  },
  {
    title: 'Karachi',
    id: 6,
  },
  {
    title: 'Multan',
    id: 7,
  },
  {
    title: 'Skardu',
    id: 8,
  },
  {
    title: 'Naran',
    id: 9,
  },
  {
    title:'Kuwait',
    id:10
  }
];

const [filteredDataSource, setFilteredDataSource] = useState(Array);
const [masterDataSource, setMasterDataSource] = useState(Array);
useEffect(() => {
  setMasterDataSource(Array);
}, []);

const searchFilterFunction = text => {
  if (text) {
    const newData = masterDataSource.filter(function (item) {
      const itemData = item.title
        ? item.title.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredDataSource(newData);
    setSearch(text);
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    setFilteredDataSource(masterDataSource);
    setSearch(text);
  }
};

const ItemView = ({item}) => {
  return (
    // Flat List Item
    <View>
      <Text style={itemStyle} onPress={() => getItem(item)}>
        {item.title}
      </Text>
    </View>
  );
};

const ItemSeparatorView = () => {
  return (
    // Flat List Item Separator
    <View
      style={{
        height: 5,
        width: '100%',
        backgroundColor: '#C8C8C8',
      }}
    />
  );
};

const getItem = item => {
  // Function for click on an item
  // alert('Id : ' + item.id + ' Title : ' + item.title);
  const city = item.title
  navigation.navigate({name: "main", params:city})
};

  return (
    <View testID="HomeScreen" style={FULL}>
          <ImageBackground source={require('../../../assets/images/Home.png')} style={{flex:1}}>

       {/* <GradientBackground colors={["#422443", "#281b34"]} /> */}
       <Header
       headerText="Home"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />

      <View style={card} >
        <TextInput
          style={textInputStyle}
          onChangeText={text => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <View style={{backgroundColor: '#cccccc', width: '95%',maxHeight:500}}>
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => `as${index}`}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>
      </View>
      </ImageBackground>
    </View>
  )
})
