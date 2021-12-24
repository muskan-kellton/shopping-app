import React, { useState } from "react";
import { Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from "react-native-gesture-handler";

const SignupScreen = (props) => {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
    });

    const onChangeHandler = (key, value) => {
        setUserData({
            ...userData,
            [key]: value,

        });
        if (key == "name") {
            if (value == "") {
                setErrors({
                    ...errors,
                    name: 'Username is required',
                });
            }
            else if (value.length > 8) {
                setErrors({
                    ...errors,
                    name: 'Username cannot exceed 8 characters',
                });
            }
            else {
                setErrors({
                    ...errors,
                    name: '',
                });
            }
        }
        else if (key == "email") {
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
        else if (key == "phone") {
            if (value == "") {
                setErrors({
                    ...errors,
                    phone: 'Phone Number is required',
                });
            }
            else if (value.length != 10) {
                setErrors({
                    ...errors,
                    phone: 'Please enter a valid phone number',
                });
            }
            else {
                setErrors({
                    ...errors,
                    phone: '',
                });
            }
        }
    }

    const onSignupHandler = () => {
        firestore()
            .collection('Users')
            .where('email', '==', userData.email)
            .limit(1)
            .get()
            .then(user => {
                if (user.docs.length == 0) {
                    firestore()
                        .collection('Users')
                        .add({
                            name: userData.name,
                            email: userData.email,
                            password: userData.password,
                            phone: userData.phone
                        })
                        .then(() => {
                            props.navigation.replace("Product");
                        });
                } else {
                    setErrors({
                        email: 'This email is already taken',
                    });
                }
            });
    }

    return (
        <View >
            <ScrollView>
                <ImageBackground source={{ uri: "https://img.freepik.com/free-vector/blurred-background-with-light-colors_1034-245.jpg?size=338&ext=jpg" }} style={styles.backgroundContainer}>
                    <Image source={{ uri: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" }} style={styles.image}></Image>
                    <TextInput style={styles.inputStyle} placeholder="Enter Name" returnKeyType="next" value={userData.name} onChangeText={(value) => onChangeHandler("name", value)} />
                    {errors.name ? <Text style={styles.errorMsg}>{errors.name}</Text> : null}
                    <TextInput style={styles.inputStyle} placeholder="Enter Email" keyboardType="email-address" returnKeyType="next" value={userData.email} onChangeText={(value) => onChangeHandler("email", value)} />
                    {errors.email ? <Text style={styles.errorMsg}>{errors.email}</Text> : null}
                    <TextInput style={styles.inputStyle} placeholder="Enter Password" returnKeyType="next" value={userData.password} onChangeText={(value) => onChangeHandler("password", value)} />
                    {errors.password ? <Text style={styles.errorMsg}>{errors.password}</Text> : null}
                    <TextInput style={styles.inputStyle} placeholder="Enter Phone" returnKeyType="next" value={userData.phone} onChangeText={(value) => onChangeHandler("phone", value)} />
                    {errors.phone ? <Text style={styles.errorMsg}>{errors.phone}</Text> : null}
                    <TouchableOpacity style={styles.SignupBtn} onPress={onSignupHandler}>
                        <Text>SIGNUP</Text>
                    </TouchableOpacity>
                    <View style={styles.loginAccount}>
                        <Text>Already have an account? </Text>
                        <TouchableOpacity onPress={() => props.navigation.replace("Login")}>
                            <Text style={styles.login}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnView}>
                        <Button title="Signup with Facebook" />
                        <Text>  </Text>
                        <Button title="Signup with Google" />
                    </View>
                </ImageBackground>

            </ScrollView>
        </View>
    );
}
export default SignupScreen;

const styles = StyleSheet.create({
    inputStyle: {
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        width: 250,
        marginTop: 10
    },

    SignupBtn: {
        width: "80%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF1493",
        marginBottom: 20,
        marginTop: 80
    },
    loginBtn: {
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
        width: 100,
        height: 100,
        marginTop: 10,
    },
    loginAccount: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    login: {
        color: 'blue'
    },
    btnView: {
        flexDirection: 'row',
        marginBottom: 20
    },
});