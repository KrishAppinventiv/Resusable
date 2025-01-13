import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScreenNames} from '../../navigator/screenNames';

import styles from './styles';
import {vh, vw} from '../../theme/dimensions';
import Button from '../../components/Button';
import InputField from '../../components/TextInput';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigator/types';

import Toast from 'react-native-toast-message';
import {colors} from '../../theme';
import {showToast} from '../../components/CustomToast';
import CustomModal from '../../components/CustomModal';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { auth, googleAuthProvider, signInWithFirebaseCredential } from '../../firebase/firebaseConfig';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { FacebookAuthProvider, getAuth, signInWithCredential } from 'firebase/auth';


type SigninScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ScreenNames.Signin
>;

const Signin = () => {
  const [Email, SetEmail] = useState('');
  const [Emailreset, SetEmailReset] = useState('');
  const [Password, SetPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailresetError, setEmailresetError] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [accountError, setAccountError] = useState(false);
  const navigation = useNavigation<SigninScreenNavigationProp>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [resetPasswordEmailSent, setResetPasswordEmailSent] = useState(false);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setEmailError(true);

      showToast('error', 'Invalid Email format');

      return false;
    } else {
      setEmailError(false);
    }

    return true;
  };

  const handleSignup = async () => {
    console.log("ready")
    try {
      console.log('go')
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const response = await GoogleSignin.signIn();
        console.log("12345678-->", response);
        const idToken = response?.data?.idToken;

        if (!idToken) {
            throw new Error('No idToken received from Google');
        }
        
        const googleCredentials = googleAuthProvider.credential(idToken);
        await signInWithFirebaseCredential(auth, googleCredentials);
        
       
    } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User cancelled the login flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Sign in operation is in progress');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Google Play Services not available');
        } else {
            console.error('Error during Google Sign-In:', error);
        }
    }
};

  
  useEffect(() => {
    console.log('Configuring Google SignIn...');
  try {
    console.log(GoogleSignin); 
    GoogleSignin.configure({
      webClientId: '685017526822-5h5iqtqva8c5det4lb088vt74ac6v2ub.apps.googleusercontent.com',
    });
    console.log('Google SignIn configured');
  } catch (error) {
    console.error('Error configuring Google SignIn:', error);
  }

    setTimeout(() => {
      emailInputRef.current?.focus();
    }, 100);
  }, []);

  const validatePassword = (password: string): boolean => {
    if (password.length < 6) {
      setPasswordError(true);

      showToast('error', 'Password should have at least 6 characters');
      return false;
    } else {
      setPasswordError(false);
    }
    return true;
  };

  const handleEmailSubmit = () => {
    setTimeout(() => {
      if (validateEmail(Email)) {
        passwordInputRef.current?.focus();
      }
    }, 100);
  };

  const buttonColor = Password && Email ? colors.main : '#E8E8E8';
  const buttonDisabled = !(Password && Email);

  const handleForgotPassword = async () => {
    if (!Emailreset) {
      showToast('error', 'Please enter your email address');
      return;
    }
    try {
      setResetPasswordEmailSent(true);
      setModalVisible(false);
      SetEmailReset('');
      showToast('success', 'Reset email sent successfully!');
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setModalVisible(false);
        SetEmailReset('');
      }, 2000);
      showToast('error', 'Error sending reset password email');
    }
  };

  // const signInWithFacebook = async () => {
  //   try {
  //     // Attempt login with Facebook
  //     console.log('LoginManager:', );
  //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  //     console.log(result)
  //     if (result.isCancelled) {
  //       throw 'User cancelled the login process';
  //     }
  
  //     // Get access token
  //     const data = await AccessToken.getCurrentAccessToken();
  
  //     if (!data) {
  //       throw 'Something went wrong obtaining access token';
  //     }
  
      
  //     const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
  //     // Sign in with the credential
  //     const userCredential = await signInWithCredential(getAuth(), facebookCredential);
  
  //     console.log('User signed in with Facebook:', userCredential.user);
  //   } catch (error) {
  //     console.error('Facebook Login Error:', error);
  //   }
  // };

  async function onFacebookButtonPress() {
    try {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }
        
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }
    
       
        const facebookCredential = getAuth.FacebookAuthProvider.credential(data.accessToken);
        
        await getAuth().signInWithCredential(facebookCredential);
        console.log('User logged in successfully');
        
    } catch (err) {
        console.log("error", err)
    }
}
  
  
  const handleSubmit = async () => {
    validatePassword(Password);
    try {
      setTimeout(() => {
        showToast('success', 'User logged in successfully!');
      }, 500);

      setTimeout(() => {
        navigation.replace(ScreenNames.Home);
      }, 2000);
    } catch (error) {
      showToast('error', 'User not found. Attempting to sign up...');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.signupContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.textContain}>
          <Text style={styles.signText}>Hello Again!</Text>

          <Text style={styles.welText}>Welcome Back</Text>
        </View>

        <View style={styles.textInputContain}>
          <View
            style={[styles.inputContainer, emailError && {borderColor: 'red'}]}>
            <InputField
              ref={emailInputRef}
              placeholder="Email Address"
              value={Email}
              onChangeText={text => SetEmail(text.toLowerCase())}
              onSubmitEditing={handleEmailSubmit}
              style={emailError ? {borderColor: 'red'} : {}}
              iconName={'email'}
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              passwordError && {borderColor: 'red'},
            ]}>
            <InputField
              ref={passwordInputRef}
              placeholder="Password"
              value={Password}
              onChangeText={text => SetPassword(text)}
              secureTextEntry={!isPasswordVisible}
              style={passwordError ? {borderColor: 'red'} : {}}
              togglePasswordVisibility={() =>
                setIsPasswordVisible(prev => !prev)
              }
              isPasswordVisible={isPasswordVisible}
              iconName="password"
            />
          </View>
        </View>

        <View style={styles.forget}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.forgetText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <Button
          onPress={handleSubmit}
          style={[styles.touch, {backgroundColor: buttonColor}]}
          disabled={buttonDisabled}
          text="Sign In"
        />
        <View style={styles.footerContain}>
          <View style={styles.footerView}></View>
          <Text style={styles.option}>Or</Text>
          <View style={styles.footerView}></View>
        </View>

        <View style={styles.otherOption}>
          <TouchableOpacity activeOpacity={0.6} onPress={handleSignup}>
            <View style={styles.googleView}>
              <Image source={Images.google} style={styles.google} />
              <Text style={{fontSize: vh(15)}}>Sign in with Google</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} onPress={onFacebookButtonPress}>
            <View style={styles.facebookView}>
              <AntDesign name={'facebook-square'} size={28} color={'white'} />
              <Text style={{fontSize: vh(15),marginLeft: vw(6),color:'white'}}>Sign in with Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>

       
        <View style={styles.dontView}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNames.Signup)}>
            <Text style={styles.signupColor}> Sign Up</Text>
          </TouchableOpacity>
        </View>

        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Your Password</Text>
            <Text style={styles.modalText}>
              Enter your email address, and we will send you a link to reset
              your password.
            </Text>
            <View style={styles.border}>
              <InputField
                placeholder="Email Address"
                value={Emailreset}
                onChangeText={text => SetEmailReset(text.toLowerCase())}
                style={emailresetError ? {borderColor: 'red'} : {}}
                iconName="email"
              />
            </View>
            {emailresetError && (
              <Text style={styles.errorText}>{emailresetError}</Text>
            )}
            <Button
              text="Send Reset Link"
              onPress={handleForgotPassword}
              disabled={false}
              style={styles.resetButton}
            />
          </View>
        </CustomModal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
