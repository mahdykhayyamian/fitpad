import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { router } from "expo-router";
import { useAppSelector } from './redux/hooks'

const FONT_FAMILY = 'Thonburi';

type ItemProps = { title: string, date: string, weight: number | null };

const Item = ({ title, date, weight }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.date}>{date}</Text>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.weight}>{weight}</Text>
  </View>
);



const Workouts = () => {

  const workouts = useAppSelector((state) => state.workouts.value)

  // const [workouts, setWorkouts] = useState(DATA);

  return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.tableHeader}>
            <Text style={styles.date}>Date</Text>
            <Text style={styles.title}>Title</Text>
            <Text style={styles.weight}>Weight</Text>
          </View>

          <FlatList
            data={workouts}
            renderItem={({ item }) => <Item title={item.type} date={item.date} weight={item.weight} />}
            keyExtractor={item => item.id}
          />

          <View>
            <Pressable
              style={styles.addWorkoutButton}
              onPress={() => {
                router.push("./addWorkout");
              }}
            >
              <Text style={styles.addWorkoutText}>Add Workout</Text>
            </Pressable>
          </View>

        </SafeAreaView>
      </SafeAreaProvider>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 2,
    marginHorizontal: 8,
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'grey',
    marginVertical: 2,
    marginHorizontal: 8,
  },
  title: {
    width: '40%',
    fontSize: 16,
    padding: 8,
    fontFamily: FONT_FAMILY
  },
  date: {
    width: '30%',
    fontSize: 14,
    padding: 8,
    fontFamily: FONT_FAMILY
  },
  weight: {
    width: '30%',
    fontSize: 16,
    padding: 8,
    fontFamily: FONT_FAMILY
  },
  addWorkoutButton: {
    marginRight: 60,
    marginLeft: 60,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  addWorkoutText: {
    color: 'white',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    fontFamily: FONT_FAMILY
  }
});

export default Workouts;
