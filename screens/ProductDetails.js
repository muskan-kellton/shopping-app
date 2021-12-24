import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Image, StyleSheet, Text, View } from "react-native";

const ProductDetails = (props) => {

    const { product } = props.route.params;

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Image source={{ uri: product.image }} style={styles.image}></Image>
                <View style={styles.view}>
                    <Text style={styles.titleText}>Price: </Text>
                    <Text style={styles.price}>{product.price}</Text>
                </View>
                <View>
                    <Text style={styles.review}>Product Reviews :</Text>
                    {product.reviews.map((review, index) => <Text style={styles.reviewsText} key={index}>- {review}</Text>)}

                </View>
            </ScrollView>
        </View>
    );
}

export default ProductDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'seashell'
    },
    card: {
        marginTop: 15,
        padding: 20,
        backgroundColor: '#FFFAFA',
    },
    name: {
        fontSize: 25,
        fontWeight: "bold",
        color: 'blue',
        marginBottom: 10,
        marginTop: 5,
        marginStart: 130
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'black',
        marginTop: 10,
        padding: 10
    },
    price: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'red',
        marginTop: 10,
        padding: 10
    },
    description: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'black',
        marginBottom: 10,
        padding: 10
    },
    review: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'black',
        marginTop: 4,
        padding: 10,
        color: 'blue'
    },
    reviewsText: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'black',
        marginTop: 5,
        padding: 10
    },
    image: {
        width: 350,
        height: 300,
        marginStart: 30
    },
    view: {
        flexDirection: 'row'
    },

});