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
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../Core/config";
import { decode, encode, atob } from "base-64";
import { useState } from "react";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export default function Test() {
  const [userDoc, setUserDoc] = useState(null);
  // Update Text
  const [category, setCategory] = useState("");
  const [id, setid] = useState("");

  // MARK: CRUD Functions
  const Create = () => {
    // MARK: Creating New Doc in Firebase
    // Before that enable Firebase in Firebase Console
    const myDoc = doc(db, "student_info", "MyDocument");

    // Your Document Goes Here
    const docData = {
      name: "iJustine",
      bio: "YouTuber",
    };

    setDoc(myDoc, docData)
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Document Created!");
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };

  const Read = () => {
    // MARK: Reading Doc
    // You can read what ever document by changing the collection and document path here
    // const myDoc = doc(db, "student_info", "MyDocument");
    const myDoc = doc(db, "student_info");

    myDoc.

    getDoc(myDoc)
      // Handling Promises
      .then((snapshot) => {
        // MARK: Success
        if (snapshot.exists) {
          setUserDoc(snapshot.data());
        } else {
          alert("No Doc Found");
        }
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };

  const Update = (value, merge) => {
    // MARK: Updating Doc
    const myDoc = doc(db, "student_info");

    // If you set merge true then it will merge with existing doc otherwise it will be a fresh one
    setDoc(myDoc, value, { merge: merge })
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Updated Successfully!");
        setText("");
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };

  const Delete = () => {
    // MARK: Deleting Doc
    const myDoc = doc(db, "student_info", "MyDocument");

    deleteDoc(myDoc)
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Deleted Successfully!");
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };
  const Add = () => {

    setDoc(doc(db,"item_info",id), {
      category: category,
      id:id,
      is_able:true,
      return_time: new Date(),
    })
      .then(() => {
        alert("Updated Successfully!");
        // setCategory(""); 잠깐 편의를 위해!
        setid("");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // const EX=()=>{const citiesRef = db.collection('student_info');
  // const snapshot =  citiesRef.where('is_reserve', '==', true).get();
  // if (snapshot.empty) {
  //   console.log('No matching documents.');
  //   return;
  // }
  
  // snapshot.forEach(doc => {
  //   console.log(doc.id, '=>', doc.data());
  // });}

  return (
    <View style={styles.container}>
      {/* <Button title="Create New Doc" onPress={Create}></Button> */}
      <TextInput
        style={{
          width: "95%",
          fontSize: 18,
          padding: 12,
          borderColor: "gray",
          borderWidth: 0.2,
          borderRadius: 10,
          marginVertical: 20,
        }}
        placeholder="Category"
        onChangeText={(category) => {
          setCategory(category);
        }}
        value={category}
      ></TextInput>
      <TextInput
        style={{
          width: "95%",
          fontSize: 18,
          padding: 12,
          borderColor: "gray",
          borderWidth: 0.2,
          borderRadius: 10,
          marginVertical: 20,
        }}
        placeholder="Type Your id"
        onChangeText={(id) => {
          setid(id);
        }}
        value={id}
      ></TextInput>
      <Button title="Add New Doc" onPress={Add}></Button>
      {/* <Button title="EX" onPress={Read}></Button> */}
      {userDoc != null && <Text>Bio: {userDoc.bio}</Text>}
      
      {/* <Button
        title="Update Doc"
        onPress={() => {
          Update(
            {
              is_reserve: true,
            },
            true
          );
        }}
        // disabled={id == ""}
      ></Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
