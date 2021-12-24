import React, { useState } from "react";
import { Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from "react-native-gesture-handler";

const LoginScreen = (props) => {

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const onChangeHandler = (key, value) => {
        setUserData({
            ...userData,
            [key]: value
        });
        if (key == "email") {
            if (value == "") {
                setErrors({
                    ...errors,
                    email: 'Email is required',
                });
            }
            else if (!value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setErrors({
                    ...errors,
                    email: 'Please enter a valid email',
                });
            }
            else {
                setErrors({
                    ...errors,
                    email: '',
                });
            }
        }
        else if (key == "password") {
            if (value == "") {
                setErrors({
                    ...errors,
                    password: 'Password is required',
                });
            }
            else if (value.length < 6) {
                setErrors({
                    ...errors,
                    password: 'Password must be atleast 6 characters long',
                });
            }
            else {
                setErrors({
                    ...errors,
                    password: '',
                });
            }
        }
    }

    const onLoginHandler = () => {
        firestore()
            .collection('Users')
            .where('email', '==', userData.email)
            .where('password', '==', userData.password)
            .limit(1)
            .get()
            .then(user => {
                if (user.docs.length == 0) {
                    setErrors({
                        email: 'Email or Password is incorrect',
                        password: 'Email or Password is incorrect',
                    });
                } else {
                    props.navigation.replace("Product");
                }
            });
    }

    return (
        <View>
            <ScrollView>
                <ImageBackground source={{ uri: "https://img.freepik.com/free-vector/blurred-background-with-light-colors_1034-245.jpg?size=338&ext=jpg" }} style={styles.backgroundContainer}>
                    <Image source={{ uri: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" }} style={styles.image}></Image>
                    <TextInput style={styles.inputStyle} placeholder="Enter Email" keyboardType="email-address" returnKeyType="next" value={userData.email} onChangeText={(value) => onChangeHandler("email", value)} />
                    {errors.email ? <Text style={styles.errorMsg}>{errors.email}</Text> : null}
                    <TextInput style={styles.inputStyle} placeholder="Enter Password" returnKeyType="next" value={userData.password} onChangeText={(value) => onChangeHandler("password", value)} />
                    {errors.password ? <Text style={styles.errorMsg}>{errors.password}</Text> : null}
                    <TouchableOpacity style={styles.loginBtn} onPress={onLoginHandler}>
                        <Text>LOGIN</Text>
                    </TouchableOpacity>
                    <View style={styles.signupAccount}>
                        <Text>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => props.navigation.replace("Signup")}>
                            <Text style={styles.signup}>SIGNUP</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnView}>
                        <Button title="Login with Facebook" />
                        <Text>  </Text>
                        <Button title="Login with Google" />
                    </View>
                </ImageBackground>
            </ScrollView>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputStyle: {
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        width: 250,
        marginTop: 15,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF1493",
        marginBottom: 20,
        marginTop: 130
    },
    signupBtn: {
        width: "80%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF1493",
        marginBottom: 20
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 12
    },
    backgroundContainer: {
        width: null,
        height: null,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        marginTop: 10,
    },
    signupAccount: {
        flexDirection: 'row',
        marginBottom: 42,
    },
    signup: {
        color: 'blue'
    },
    btnView: {
        flexDirection: 'row',
        marginBottom: 20
    }
});