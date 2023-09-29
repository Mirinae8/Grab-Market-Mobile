import { StyleSheet, SafeAreaView } from "react-native";
// {/* app.js에 적은 코드를 main.js로 분리했다 */}
import MainScreen from "./screens/main";
import ProductScreen from "./screens/product";
// 최상단에 리액트 네비게이션이 있어야한다
import { NavigationContainer } from "@react-navigation/native";
// 네비게이터를 여러개 사용할 수도 있다
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // 상단 노치부분을 비우기 위해 사용하는 컴포넌트 (주로 최상단에 작성)
    <SafeAreaView style={styles.safeAreaView}>
      <NavigationContainer>
        {/* initialRouteName는 네비게이터가 맨 처음 보여줄 화면을 설정  */}
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{
              // 상단에 나오는 화면 명칭 지정
              title: "홈 화면",
            }}
          />
          <Stack.Screen
            name="Product"
            component={ProductScreen}
            options={{
              title: "상품 화면",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

// 리액트 네이티브는 스타일이 없어 스타일시트로 (css와 달리 -가 아닌 카멜 표기법 사용+)
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
