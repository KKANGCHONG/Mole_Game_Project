import React from 'react';
import {router} from "expo-router";
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
    return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.backgroundImage} >
        <View style={styles.container}>
            <Image source={require('../assets/Gamename.png')} style={styles.gameName} />
            <TouchableOpacity onPress={function() {router.navigate('PlayScreen')}}>
                <Image source={require('../assets/StartButton.png')} style={styles.startButton} />
            </TouchableOpacity>
        </View>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1, // 부모 View가 화면 전체를 차지하도록 설정
        alignItems: 'center', // 가로 방향(수평)으로 정렬
        justifyContent: 'center', // 세로 방향(수직)으로 정렬
    },
    
    gameName: {
        width: 240,
        height: 150,
        marginBottom: 30, // 아래쪽에 여백 추가
        resizeMode: 'contain', // 이미지 비율 유지
    },
    
    startButton: {
        width: 150, // 시작 버튼 이미지의 너비
        height: 50, // 시작 버튼 이미지의 높이
        resizeMode: 'contain', // 이미지 비율 유지
    },
});
