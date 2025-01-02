import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'


interface Workout {
    id: string,
    date: string
    type: string
    weight: number | null
    notes: string | null
}

// Define a type for the slice state
interface WorkoutsState {
  value: Workout[]
}

const date1 = new Date();

const date2 = new Date();
date2.setDate(date1.getDate() + 7);

const date3 = new Date();
date3.setDate(date2.getDate() + 7);

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    type: 'Chest Workout',
    date: date1.toDateString(),
    weight: 183,
    notes: 'Good one',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    type: 'Back Workout',
    date: date2.toDateString(),
    weight: 180,
    notes: 'Tough one',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    type: 'Leg Workout',
    date: date3.toDateString(),
    weight: 185,
    notes: 'Nice one',
  },
];



// Define the initial state using that type
const initialState: WorkoutsState = {
  value: DATA,
}

export const workoutsSlice = createSlice({
  name: 'workouts',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addWorkout: (state, action: PayloadAction<Workout>) => {
      state.value.push(action.payload);
    }
  },
})

export const { addWorkout } = workoutsSlice.actions

export default workoutsSlice.reducer