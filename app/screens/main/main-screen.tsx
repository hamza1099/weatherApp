import React,{FC,useState,useEffect} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle,View,TextStyle,Text,ImageBackground } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { spacing } from "../../theme"
import {  StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import {
  Header
} from "../../components"
// import { GradientBackground } from "../../components/gradient-background/gradient-background"
// import {images} from '../../../assets/images/index'

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

const ImgContainer: ViewStyle={
  width: 300,
  height: 300,
  borderRadius: 200,
  borderWidth: 3,
  borderColor: '#7120E5',
  overflow: 'hidden',
  marginVertical: 20,
  marginLeft:42,
  shadowColor: 'white',
  shadowOpacity: 1,
  shadowOffset: {width: 0, height: 2},
  backgroundColor: '#411292',
}

const Img:ViewStyle= {
  height: '100%',
  width: '100%',
}
const Tempstyle:TextStyle={
  color:"white",
  fontSize:65,
  fontWeight:"200",
  textAlign:'center',
  marginTop:10

}
const Description:TextStyle={
  color:"#37B1D3",
  fontSize:30,
  fontWeight:"300",
  textAlign:'center',
  marginTop:55
}

const Bar:ViewStyle={
  borderColor:'#37B1D3',
  borderWidth:  1,
  width:"80%",
  marginLeft:30
}
const City:TextStyle={
  color:"#37B1D3",
  fontSize:30,
  fontWeight:"300",
  textAlign:'center',
  marginTop:15
}
// const Imgback=require('../../../assets/images/RainyImage.jpeg')
export const MainScreen :FC<StackScreenProps<NavigatorParamList, "main">> = observer(
  ({ route,navigation }) => {
    const [dataSource, setDataSource] = useState(null);
    const [backgroundImage,setBackgroundImage]=useState(require('../../../assets/images/Home.png'))
    // const city = navigation.navigate
    const goBack = () => navigation.goBack()
   
    useEffect(() => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${route.params}&appid=c3d57bda0032dd3c0d7745da80417f04`,
      )
        .then(response => response.json())
        .then(res => {
          if(res.weather[0].description==="clear sky"){
            setBackgroundImage(require('../../../assets/images/clear.jpeg'))
            }
            if(res.weather[0].description==="overcast clouds"){
              setBackgroundImage(require('../../../assets/images/RainyImage.jpeg'))
              }
              if(res.weather[0].description==="haze"){
                setBackgroundImage(require('../../../assets/images/haze.jpeg'))
                }
                if(res.weather[0].description==="few clouds"){
                  setBackgroundImage(require('../../../assets/images/mostlyCloudImg.jpeg'))
                  }
                  if(res.weather[0].description==="smoke"){
                    setBackgroundImage(require('../../../assets/images/haze.jpeg'))
                    }
              
          setDataSource(res);
        })
        .catch(error => {
          console.error(error);
        })
       
    }, [])
    const Temprature=()=>{
      const convert=273.15;
      const count = parseInt(dataSource.main.temp)
      const final = count - convert;
      const num =final.toFixed(0)
      return num
    }
              // console.log(require('./'))

  return (
    <View testID="MainScreen" style={FULL}>
    {/* <GradientBackground colors={["#422443", "#281b34"]} /> */}
    <ImageBackground source={backgroundImage} style={{flex:1}}>

    <Header
    headerText="WEATHER FORCAST"
         leftIcon="back"
         onLeftPress={goBack}
         style={HEADER}
         titleStyle={HEADER_TITLE}
       />
    

        <View>
        {dataSource ? (
          <View>
            <View style={ImgContainer}>
              <View style={Img}>
                <View>
                  <Text style={Description} >{dataSource.weather[0].description}</Text>
                  <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Text style={Tempstyle} >{Temprature()}</Text>
                    <Text style={Tempstyle}>°C</Text>
                  </View>
                  <View style={Bar}></View>
                  <View>
                    <Text style={City}>{dataSource.name}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
      </ImageBackground>
    </View>
  )
})
