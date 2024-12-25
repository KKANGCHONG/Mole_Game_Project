import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import * as FileSystem from 'expo-file-system';

const filePath = `${FileSystem.documentDirectory}scores.json`; // 점수 저장 파일 경로

export default function ScoreScreen() {
  const [scores, setScores] = useState<number[]>([]);

  useEffect(() => {
    const loadScores = async () => {
      try {
        const fileExists = await FileSystem.getInfoAsync(filePath);
        if (fileExists.exists) {
          const fileContents = await FileSystem.readAsStringAsync(filePath);
          const parsedScores = JSON.parse(fileContents);
          setScores(parsedScores.sort((a, b) => b - a)); // 내림차순 정렬
        }
      } catch (err) {
        console.error('Error loading scores:', err);
      }
    };

    loadScores();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/Background.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Score Board</Text>
        <FlatList
          data={scores}
          renderItem={({ item, index }) => (
            <Text style={styles.scoreItem}>
              #{index + 1}: {item} pts
            </Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    },
    title: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    fontFamily: 'Galmuri',
    },
    scoreItem: {
    fontSize: 18,
    marginVertical: 5,
    color: 'white',
        fontFamily: 'Galmuri',
    },
});
