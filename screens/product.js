// 리액트 네이티브는 최상단에 해당 처리 필수
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { API_URL } from "../config/constatns";
import Avatar from "../assets/icons/avatar.png";

export default function ProductScreen(props) {
  // 프롭스에서 화면이동시 넣어준 값 가져옴
  const { id } = props.route.params;
  const [product, setProduct] = useState(null);
  // 서버와 한번만 통신하면 되므로 useEffect
  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // product는 처음에 null이므로 방어 코드 작성
  if (!product) {
    // 리액트 네이티브에서 제공하는 로딩 아이콘
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image
            style={styles.prodcutImage}
            source={{ uri: `${API_URL}/${product.imageUrl}` }}
            resizeMod="contain"
          />
        </View>
        <View style={styles.productSection}>
          <View style={styles.productSeller}>
            <Image style={styles.avatarImage} source={Avatar} />
            <Text>{product.seller}</Text>
          </View>
          <View style={styles.divider} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  prodcutImage: {
    width: "100%",
    height: 300,
  },

  productSeller: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarImage: {
    width: 50,
    height: 50,
  },

  productSection: {
    padding: 16,
  },

  // 구분 선
  divider: {
    backgroundColor: "#e9ecef",
    height: 1,
    // 마진 탑,바탐을 한번에 사용하는 리액트 네이티브 기본 속성
    marginVertical: 16,
  },
});
