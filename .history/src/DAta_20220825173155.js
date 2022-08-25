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

  export default function GETDATA(){
    const querySnapshot = getDocs(collection(db, "cities"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
  }
