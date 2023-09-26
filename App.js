import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!!!</Text>
      <StatusBar style="auto" />
      <View style={styles.box}>
        <Text>1번</Text>
      </View>
      <View style={styles.box}>
        <Text>2번</Text>
      </View>
    </View>
  );
}

// 리액트 네이티브는 스타일이 없어 스타일시트로 (css와 달리 -가 아닌 카멜 표기법 사용+)
const styles = StyleSheet.create({
  container: {
    // 기본적으로 디스플레이 플렉스가 적용 (기본이 수직인 column)
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "blue",
    // 모바일은 DP라는 개념으로 사이즈 적용 (웹은 픽셀)
    marginBottom: 8,
    width: 100,
    height: 100,
  },
});
