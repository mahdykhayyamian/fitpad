import { Stack } from "expo-router";
import { store } from './redux/store'
import { Provider } from 'react-redux'


export const unstable_settings = {
  initialRouteName: 'workouts',
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="workouts" options={{ title: 'Workouts' }} />
        <Stack.Screen name="addWorkout" options={{ title: 'Add Workout' }} />
      </Stack>
    </Provider>
  );
}
