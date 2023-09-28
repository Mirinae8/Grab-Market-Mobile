import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import BasketballImage from "./assets/products/basketball1.jpeg";
import Avatar from "./assets/icons/avatar.png";
import { API_URL } from "./config/constatns";
// axios는 자바스크립트로만 통신 하므로 리액트 네이티브에서 사용 가능
import axios from "axios";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Carousel from "react-native-reanimated-carousel";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function App() {
  const [products, setProducts] = React.useState([]);
  const [banners, setBanners] = React.useState([]);
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
    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        setBanners(result.data.banners);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    // 상단 노치부분을 비우기 위해 사용하는 컴포넌트 (주로 최상단에 작성)
    <SafeAreaView style={styles.safeAreaView}>
      {/* // 웹은 자동 스크롤을 지원하지만 모바일 환경에서는 리액트 네이티브의 ScrollView를 사용해야 한다 */}
      <View style={styles.container}>
        <ScrollView>
          <Carousel
            // {/* 캐러셀에 넣을 필수 데이터 */}
            data={banners}
            width={Dimensions.get("window").width}
            height={200}
            autoPlay={true}
            // {/* Dimensions 객체는 디바이스의 너비와 높이를 확인할 수 있는 객체 (슬라이더 길이를 화면 너비만큼)*/}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width}
            itemHeight={200}
            // {/* obj에 들어가는 값은 data에 있는 데이터를 넣어줌 (배열이므로 각각의 객체를 넣음) */}
            // 함수형태로 데이터를 넣어줘야 한다 (맵처럼 각각 반환해야함)
            renderItem={(obj) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert("배너 클릭");
                  }}
                >
                  {/* <Text>{`${API_URL}/${obj.item.imageUrl}`}</Text> */}
                  <Image
                    style={styles.bannerImage}
                    source={{
                      uri: `${API_URL}/${obj.item.imageUrl}`,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            }}
          />
          <Text style={styles.headLine}>판매되는 상품들</Text>
          <View style={styles.productList}>
            {/* 맵으로 매번 다른 리턴하는 부분에서 리액트에서 랜더링시 성능 향상을 위해 키값을 넣어줘야함 */}
            {products.map((product, index) => {
              return (
                <View style={styles.productCard} key={index}>
                  {/* 상품이 품절된 경우에만 블러처리 and 조건문으로 앞을 통과해야 뒤가 동작하도록*/}
                  {product.soldout === 1 && <View style={styles.prodcutBlur} />}
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
    </SafeAreaView>
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
  prodcutBlur: {
    // 포지션은 부모기준으로해서 자신의 위치 결정 (다른 자식과 상관없이)
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "#ffffffaa",
    // 제트 인덱스는 깊이( 높을수록 더 위로 사용자가 보이도록)
    zIndex: 999,
  },
  bannerImage: {
    width: "100%",
    height: 200,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
