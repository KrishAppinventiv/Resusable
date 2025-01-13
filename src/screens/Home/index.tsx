import {View, Text,ImageBackground, StyleSheet, TouchableOpacity,Image} from 'react-native';
import React, {useEffect} from 'react';
import { Images } from '../../assets';
import { useNavigation } from '@react-navigation/native';





import { ScreenNames } from '../../navigator/screenNames';
import { RootStackParamList } from '../../navigator/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';

const Home = () => {
    const navigation = useNavigation();
  return (
    <ImageBackground source={Images.tutorial} style={styles.container}>
     
    <View style={styles.head}>
      <Image source={Images.chef}></Image>
      <Text style={styles.premium}>100K+ Premium Component</Text>    
    </View>

    <View style={styles.mainView}>
      <Text style={styles.welcome}>Welcome at Resuable Components</Text>
      <Text style={styles.tasty}>Simple way to find Custom Component</Text>
      <TouchableOpacity style={styles.touch} onPress={()=>{
       
        navigation.navigate(ScreenNames.Signin)
        }}>
        <Text style={styles.start}>Restart Authentication</Text>
      </TouchableOpacity>
    </View>
   
     
    </ImageBackground>
  )
}

export default Home

