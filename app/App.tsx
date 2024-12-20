import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import { Audio } from 'expo-av'; // expo-av 라이브러리
import * as Font from 'expo-font'; // expo-font 라이브러리
import AppLoading from 'expo-app-loading'; // 로딩 화면 표시

const { width, height } = Dimensions.get('window'); // 화면의 가로와 세로 길이

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false); // 폰트 로드 상태
  const [molePosition, setMolePosition] = useState({ top: 0, left: 0 }); // 두더지 위치
  const [score, setScore] = useState(0); // 점수
  const [timeLeft, setTimeLeft] = useState(30); // 게임 남은 시간
  const [startCountdown, setStartCountdown] = useState(3); // 게임 시작 카운트다운
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // 게임 시작 여부
  const [sound, setSound] = useState(null); // 두더지 클릭 사운드
  const [backgroundMusic, setBackgroundMusic] = useState(null); // 배경 음악 객체

  // 커스텀 폰트 로드
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Galmuri: require('../assets/font/Galmuri14.ttf'), // 폰트 로드
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  // 두더지 클릭 사운드 로드
  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(require('../assets/Sound_Effect.m4a'));
      setSound(sound);
    };
    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync(); // 사운드 리소스 해제
      }
    };
  }, []);

  // 배경 음악 로드 및 재생
  useEffect(() => {
    const loadBackgroundMusic = async () => {
      const { sound: music } = await Audio.Sound.createAsync(require('../assets/BackgroundMusic.m4a'), {
        isLooping: true, // 배경 음악 반복 재생
      });
      setBackgroundMusic(music);
    };
    loadBackgroundMusic();

    return () => {
      if (backgroundMusic) {
        backgroundMusic.unloadAsync(); // 배경 음악 해제
      }
    };
  }, []);

  // 게임 시작 시 배경 음악 재생
  useEffect(() => {
    if (gameStarted && backgroundMusic) {
      backgroundMusic.playAsync();
    }
  }, [gameStarted, backgroundMusic]);

  // 게임 종료 시 배경 음악 중지
  useEffect(() => {
    if (gameOver && backgroundMusic) {
      backgroundMusic.stopAsync();
    }
  }, [gameOver, backgroundMusic]);

  // 사운드 재생
  const playSound = async () => {
    if (sound) {
      await sound.replayAsync();
    }
  };

  // 게임 시작 카운트다운
  useEffect(() => {
    if (startCountdown > 0) {
      const timer = setTimeout(() => {
        setStartCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setGameStarted(true); // 게임 시작
    }
  }, [startCountdown]);

  // 두더지 위치를 랜덤으로 변경
  const moveMole = () => {
    const newTop = Math.random() * (height - 200); // 화면 세로 범위 내 랜덤 위치
    const newLeft = Math.random() * (width - 100); // 화면 가로 범위 내 랜덤 위치
    setMolePosition({ top: newTop, left: newLeft });
  };

  // 게임 타이머 설정 및 두더지 이동
  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        moveMole(); // 두더지 이동
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true); // 게임 종료
    }
  }, [gameStarted, timeLeft]);

  // 두더지를 클릭하면 점수 증가 및 사운드 재생
  const handleMolePress = () => {
    if (gameStarted && !gameOver) {
      setScore((prevScore) => prevScore + 1); // 점수 증가
      playSound(); // 사운드 재생
      moveMole(); // 두더지 이동
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />; // 폰트 로드 중 로딩 화면 표시
  }

  return (
    <ImageBackground
      source={require('../assets/Background.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* 게임 시작 전 카운트다운 */}
        {!gameStarted && (
          <View style={styles.startContainer}>
            <Text style={styles.startText}>두더지 게임 시작!</Text>
            <Text style={styles.countdownText}>{startCountdown}</Text>
          </View>
        )}

        {/* 게임 진행 화면 */}
        {gameStarted && !gameOver && (
          <>
            <View style={styles.gameInfo}>
              <Text style={styles.timer}>남은 시간: {timeLeft}초</Text>
              <Text style={styles.score}>점수: {score}</Text>
            </View>
            <TouchableOpacity
              onPress={handleMolePress}
              style={[styles.mole, { top: molePosition.top, left: molePosition.left }]}
            >
              <Image source={require('../assets/mole.png')} style={styles.moleImage} />
            </TouchableOpacity>
          </>
        )}

        {/* 게임 종료 화면 */}
        {gameOver && (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>게임 종료!</Text>
            <Text style={styles.gameOverText}>최종 점수: {score}</Text>
          </View>
        )}
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
    flex: 1,
    justifyContent: 'center',
  },
  startContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    fontFamily: 'Galmuri',
  },
  countdownText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'yellow',
    fontFamily: 'Galmuri',
  },
  gameInfo: {
    position: 'absolute',
    top: 40,
    right: 20,
    alignItems: 'flex-end',
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Galmuri',
  },
  score: {
    fontSize: 18,
    marginTop: 5,
    color: 'white',
    fontFamily: 'Galmuri',
  },
  mole: {
    position: 'absolute',
    width: 140,
    height: 140,
  },
  moleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  gameOverContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOverText: {
    fontSize: 28,
    color: 'red',
    textAlign: 'center',
    fontFamily: 'Galmuri',
  },
});
