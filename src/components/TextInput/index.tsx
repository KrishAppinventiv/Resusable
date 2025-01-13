import React, { forwardRef } from 'react';
import { TextInput, StyleSheet, TextInputProps, View, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { vh } from '../../theme/dimensions';
import { Images } from '../../assets';

interface InputFieldProps extends TextInputProps {
  style?: object;
  iconName?: string;
  togglePasswordVisibility?: () => void; 
  isPasswordVisible?: boolean;
}

const InputField = forwardRef<TextInput, InputFieldProps>((props, ref) => {
  const { value, placeholder, onChangeText, style, onSubmitEditing, secureTextEntry, returnKeyType, iconName ,togglePasswordVisibility, 
    isPasswordVisible  } = props;

  return (
    <View style={[styles.container, style]}>
      {iconName && (
        <MaterialIcons
          name={iconName}
          size={20}
          color={'#ccc'}
         
        />
      )}
      <TextInput
        ref={ref}
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
      />

{togglePasswordVisibility && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Image
            source={isPasswordVisible ? Images.eye : Images.hide}
            style={styles.img2}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
   
    borderRadius: 8,
    
  },
  input: {
    flex: 1, 
    padding: 10,
    fontSize: 16,
  },
 
  img2: {
    width: vh(17),
    height: vh(17),
   
  },
});

export default InputField;
