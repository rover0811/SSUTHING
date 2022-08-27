import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from 'react';
import { StyleSheet, Text, View ,StatusBar ,Button,ScrollView } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { Header , ListItem, Avatar  } from 'react-native-elements';
import {firebase_db} from '../firebase';
import { useEffect, useState } from 'react';
import { doc,collection, addDoc, getDocs, query, where, orderBy, limit } from "firebase/firestore/lite";
​
​
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function makeIconRender(name,color) {
    return ({ color, size }) => (
      <MaterialCommunityIcons name={name} color={color} size={size} />
    );
  }
​
​
export default function Main(){
  
    return(
<NavigationContainer>
    <Tab.Navigator screenOptions={{headerStyle: {
    backgroundColor: "#308FFF",
  },
  headerTintColor: "white",
  headerBackTitle: "",
  tabBarStyle: [{ backgroundColor: "#308FFF" }],}}>
        <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarIcon: makeIconRender("home","#FFFFFF")}}
        ></Tab.Screen>
        <Tab.Screen
        name="Traffic"
        component={TrafficStack}
        options={{ tabBarIcon: makeIconRender("poll","#FFFFFF") }}
        ></Tab.Screen>
        <Tab.Screen
        name="Safety"
        component={SafetyStack}
        options={{ tabBarIcon: makeIconRender("shield-car","#FFFFFF") }}></Tab.Screen>
        <Tab.Screen
        name="CarLog"
        component={Car}
        options={{ tabBarIcon: makeIconRender("car-arrow-right","#FFFFFF") }}
        ></Tab.Screen>
        <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{ tabBarIcon: makeIconRender("account","#FFFFFF") }}></Tab.Screen>
    </Tab.Navigator>
</NavigationContainer>
    )
}
​
function HomeStack() {
    return (
<View><Text>Hello</Text></View>
    );
  }
​
function TrafficStack() {
    return (
<View><Text>Hello</Text></View>
    );
  }
function SafetyStack() {
    return (
<View><Text>Hello</Text></View>
    );
  }
​
​
​
// function CarLogStack(list) {
​
//     return (
​
//       <View>
//         {
//           list.map((item, i) => (
//             <ListItem key={i} bottomDivider>
//               <Icon name={item.icon} />
//               <ListItem.Content>
//                 <ListItem.Title>{item.title}</ListItem.Title>
//               </ListItem.Content>
//               <ListItem.Chevron />
//             </ListItem>
//           ))
//         }
//       </View>      );
// }
​
function AccountStack() {
    return (
<View><Text>Hello</Text></View>
    );
  }
​
​
function Car() {
const [value_data, setvalue_data] = useState([
  {
    car_info: {
      car_type: "스타리아",
      is_resident: "N",
      regi_num: "85나2353",
      visit_purpose: "방문",
    },
    ta_history: {
      is_facility_damage: "0",
      is_people_damage: "0",
      num_of_ta: "0",
    },
    time_info: {
      departure_time: "2022-08-02-19:34",
      entrace_time: "2022-08-22T15:12:00.000Z",
    },
  },
]);
const addCollection =collection(firebase_db,'parking_system');
const defalut_data =async () => {
    
  const q = await query(
    addCollection,
    //where("risk", "!=", "dd"),
    //orderBy("risk", "desc"),
  
    //limit(1)
  );
  const getdata = await getDocs(q);
  const resultdata = getdata.docs.map(doc => ({ ...doc.data() }));
 
  setvalue_data(data => data =JSON.parse(JSON.stringify(resultdata)))
  //console.log(resultdata);
 // alert(resultdata)
}
useEffect(() => {
  defalut_data()
 
  return () => {
   
  }
}, [])
  return (
<ScrollView>
{value_data&&value_data.length !== 0 ? (<>
        {
        value_data.map((l, i) => (
          <>
    
          <ListItem  key={i} bottomDivider onPress={() => navigation.navigate("Listitems")}>
            <Avatar source={{uri: l.car_info.car_type}} />
            <ListItem.Content>
              <ListItem.Title>{l.car_info.car_type}</ListItem.Title>
              <ListItem.Subtitle>{l.car_info.regi_num}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem></>
        ))
      }</>):("")}
  {
    list.map((l, i) => (
      <ListItem key={i} bottomDivider>
        <Avatar source={{uri: l.avatar_url}} />
        <ListItem.Content>
          <ListItem.Title>{l.name}</ListItem.Title>
          <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ))
  }
</ScrollView>
  );
  }
  
​
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    textinfo:{
      margin:10, 
      textAlign: 'center',
      fontSize: 17,    
    },
  });