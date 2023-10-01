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
  TouchableOpacity,
  Alert,
} from "react-native";
import { API_URL } from "../config/constatns";
import Avatar from "../assets/icons/avatar.png";
import dayjs from "dayjs";

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

  const onPressButton = () => {
    if (!product.soldout) {
      Alert.alert("구매가 완료되었습니다");
    }
  };

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
          <View>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}원</Text>
            <Text style={styles.productDate}>
              {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
            </Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
        </View>
      </ScrollView>
      {/* 플로팅 버튼 화면 스크롤해도 위치 고정된 버튼 */}
      <TouchableOpacity onPress={onPressButton}>
        {/* 판매된 상품에는 다른 스타일을 적용 */}
        <View
          style={
            product.soldout ? styles.purchaseDisabled : styles.purchaseButton
          }
        >
          <Text style={styles.purchaseText}>
            {product.soldout === 1 ? "구매완료" : "구매하기"}
          </Text>
        </View>
      </TouchableOpacity>
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

  productName: {
    fontSize: 20,
    fontWeight: "400",
  },

  productPrice: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },

  productDate: {
    fontSize: 14,
    marginTop: 4,
    color: "rgb(204,204,204)",
  },

  productDescription: {
    marginTop: 16,
    fontSize: 17,
  },

  purchaseButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "rgb(255,80,88)",
    alignItems: "center",
    justifyContent: "center",
  },

  purchaseText: {
    color: "white",
    fontSize: 20,
  },

  purchaseDisabled: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
  },
});
