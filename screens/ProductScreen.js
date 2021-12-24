import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from "react-native-gesture-handler";

const ProductScreen = (props) => {
    const [products, setProducts] = useState([]);
    const [isGridView, setIsGridView] = useState(false);

    useEffect(() => {
        firestore()
            .collection('Products')
            .get()
            .then(products => {
                const array = [];
                for (let product of products._docs) {
                    array.push(product._data);
                }
                setProducts(array);
            });
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Button title="User Details" onPress={() => props.navigation.navigate("UserDetails")} />
                <Text>          </Text>
                <Button title={isGridView ? "Change to Linear" : "Change to Grid"} onPress={() => setIsGridView(!isGridView)} />
            </View>
            <FlatList
                key={isGridView ? '_' : '#'}
                data={products}
                renderItem={(product) => {
                    return (
                        <View key={product.item.id} style={styles.card}>
                            <Text style={styles.titleText}>{product.item.name}</Text>
                            <View>
                                <Image source={{ uri: product.item.image }} style={{ width: isGridView ? 150 : 390, height: isGridView ? 100 : 300 }}></Image>
                            </View>
                            <Text style={styles.titleText}>{product.item.price} Rs.</Text>
                            <TouchableOpacity style={styles.cartButton}>
                                <Text>Add to Cart</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.detailsButton} >
                                <Text onPress={() => props.navigation.navigate("ProductDetails", { product: product.item })}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}

                numColumns={isGridView ? 2 : 1}
            />

        </View>
    );
}

export default ProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",

    },
    cartButton: {
        width: "94%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF9933",
        marginTop: 10,
    },
    detailsButton: {
        width: "94%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFCC00",
        marginTop: 10,
    },
    card: {
        marginTop: 15,
        padding: 20,
        backgroundColor: '#FFFAFA',
        marginRight: 15,
    },
    topContainer: {
        flexDirection: "row",
        marginTop: 5
    },
});