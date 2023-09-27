import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import BasketballImage from "./assets/products/basketball1.jpeg";
import Avatar from "./assets/icons/avatar.png";
import { API_URL } from "./config/constatns";
// axios는 자바스크립트로만 통신 하므로 리액트 네이티브에서 사용 가능
import axios from "axios";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function App() {
  const [products, setProducts] = React.useState([]);
  // useEffect는 첫번째 콜백함수의 실행을 관리할 수 있다
  React.useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((result) => {
        // console.log(result);
        setProducts(result.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    // 웹은 자동 스크롤을 지원하지만 모바일 환경에서는 리액트 네이티브의 ScrollView를 사용해야 한다
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headLine}>판매되는 상품들</Text>
        <View style={styles.productList}>
          {products.map((product, index) => {
            return (
              <View style={styles.productCard}>
                {/* 이미지 영역 */}
                <View>
                  {/* 리액트 네이티브는 리엑트와 달리 이미지를 import 해야 한다*/}
                  {/* 리액트 에서는 object-fit 를 사용해 이미지 해상도 비율을 유지했지만 리액트 네이티브는 resizeMode 사용 */}
                  <Image
                    style={styles.productImage}
                    //   source={BasketballImage} 내부 이미지 불러온것
                    // 외부 이미지를 가져오기 위해서는
                    source={{
                      // 해당 이미지 주소를 넣는다
                      uri: `${API_URL}/${product.imageUrl}`,
                    }}
                    resizeMode={"contain"}
                  />
                </View>
                {/* 컨텐츠 영역 */}
                <View style={styles.prodcutContents}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.prodcutPrice}>{product.price}원</Text>
                  <View style={styles.productFooter}>
                    <View style={styles.productSeller}>
                      <Image style={styles.productAvatar} source={Avatar} />
                      <Text style={styles.productSellerName}>
                        {product.seller}
                      </Text>
                    </View>
                    <Text style={styles.productDate}>
                      {dayjs(product.createdAt).fromNow()}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

// 리액트 네이티브는 스타일이 없어 스타일시트로 (css와 달리 -가 아닌 카멜 표기법 사용+)
const styles = StyleSheet.create({
  container: {
    // 기본적으로 디스플레이 플렉스가 적용 (기본이 수직인 column)
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
  },
  productCard: {
    width: 320,
    borderColor: "rgb(230,230,203)",
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "whilte",
    marginBottom: 8,
  },
  productImage: {
    // 100% 는 문자열로 설정
    width: "100%",
    height: 210,
  },
  prodcutContents: {
    padding: 8,
  },
  productSeller: {
    // 플렉스 디렉션 기본 column에서 row로 변경
    flexDirection: "row",
    alignItems: "center",
  },
  productAvatar: {
    width: 24,
    height: 24,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  productName: {
    fontSize: 16,
  },
  prodcutPrice: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  productSellerName: {
    fontSize: 16,
  },
  productDate: {
    fontSize: 16,
  },
  productList: {
    alignItems: "center",
  },
  headLine: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 24,
  },
});
