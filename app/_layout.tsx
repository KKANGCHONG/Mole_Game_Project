import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(243, 202, 122, 0)", // 투명도 설정
          borderTopWidth: 0, // 탭 상단 경계선 제거
          height: 50, // 탭 높이
          position: "absolute", // 화면 위에 떠 있는 느낌
          shadowColor: "transparent", // 그림자 제거
        },
        tabBarLabelStyle: {
          fontSize: 25,
          fontWeight: "bold",
          fontFamily: "Galmuri", // 갈무리체 적용
          color: "#FFFFFF", // 텍스트 색상
        },
        tabBarActiveTintColor: "#FFD700", // 활성화된 탭의 텍스트 색상
        tabBarInactiveTintColor: "#7F8C8D", // 비활성화된 탭의 텍스트 색상
        tabBarIconStyle: {
          display: "none", // 아이콘 제거 (필요 시 추가 가능)
        },
        headerStyle: {
          backgroundColor: "#F3CA7A", // 상단 네비게이션 바 배경색
          borderBottomWidth: 0, // 상단 경계선 제거
        },
        headerTitleStyle: {
          color: "#FFFFFF", // 상단 네비게이션 바 텍스트 색상
          fontSize: 22,
          fontWeight: "bold",
          fontFamily: "Galmuri", // 갈무리체 적용
        },
      }}
    >
      <Tabs.Screen
        name="ScoreScreen"
        options={{
          title: "", // 상단 네비게이션 바 제목
          tabBarLabel: "📜", // 탭에 이모지 추가
        }}
      />
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: "", // 상단 네비게이션 바 제목
          tabBarLabel: "🏠", // 탭에 이모지 추가
        }}
      />
      <Tabs.Screen
        name="PlayScreen"
        options={{
          title: "", // 상단 네비게이션 바 제목
          tabBarLabel: "🎮", // 탭에 이모지 추가
        }}
      />
    </Tabs>
  );
}
