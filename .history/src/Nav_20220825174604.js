import "react-native-gesture-handler";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button
  ,useEffect
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import IdTable from "./Table";
import Test from "./CRUD";
import GETDATA from "./DAta";
import { db } from "../Core/config";
import {
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  whereField,
  isEqualTo,
  query,
  where,
} from "firebase/firestore";
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("SecurityList")}>
          <MaterialCommunityIcons name="shield" size={100} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("EducationList")}>
          <MaterialCommunityIcons name="calculator" size={100} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("FestivalList")}>
          <MaterialCommunityIcons
            name="microphone-variant"
            size={100}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("LeisureList")}>
          <MaterialCommunityIcons name="basketball" size={100} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
function SecurityList() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <IdTable></IdTable>
    </View>
  );
}
function EducationList() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>EducationList</Text>
    </View>
  );
}
function FestivalList() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>FestivalList</Text>
    </View>
  );
}
function LeisureList() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>LeisureList</Text>
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator initialRoutName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SecurityList" component={SecurityList} />
      <Stack.Screen name="EducationList" component={EducationList} />
      <Stack.Screen name="FestivalList" component={FestivalList} />
      <Stack.Screen name="LeisureList" component={LeisureList} />
    </Stack.Navigator>
  );
}

function Search() {
  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text>Search</Text>
    // </View>
    <Test></Test>
  );
}
function MyList() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>MyList!</Text>
    </View>
  );
}
function Account() {
  useEffect(() => {
    // bucket이라는 변수로 firestore의 collection인 bucket에 접근
    const ref=db.collection("item_info");

    // 모든 document 가져오기
    ref.get().then((docs) => {
      // 반복문으로 docuemnt 하나씩 확인
      docs.forEach((doc) => {
        if(doc.exists){
          // document의 데이터
          console.log(doc.data());
          // document의 id
          console.log(doc.id);
        }
      });
    });
  
  });
  return (
    <View className="App">
      firebase 확인해보기!
    </View>
  );
}

const Tab = createBottomTabNavigator();
function UnderTab() {
  return (
    <Tab.Navigator screenOptions={screenOptionStyle}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarIcon: makeIconRender("home") }}
        style={{ backgroundColor: "#68CDC1" }}
      />
      <Tab.Screen
        name="MyList"
        component={MyList}
        options={{ tabBarIcon: makeIconRender("history") }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{ tabBarIcon: makeIconRender("magnify") }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{ tabBarIcon: makeIconRender("account") }}
      />
    </Tab.Navigator>
  );
}

export default function Nav() {
  return (
    <NavigationContainer>
      <UnderTab></UnderTab>
    </NavigationContainer>
  );
}

function makeIconRender(name) {
  return ({ color, size }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
  );
}

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#68CDC1",
  },
  headerTintColor: "white",
  headerBackTitle: "",
  tabBarStyle: [{ backgroundColor: "#68CDC1" }],
};
