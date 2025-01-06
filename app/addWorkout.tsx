import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch } from './redux/hooks'
import { addWorkout } from './redux/workoutsSlice'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


const FONT_FAMILY = 'Thonburi';

interface Props {
	onSave: () => void;
}

export const AddWorkout: React.FC<Props> = ({ onSave }) => {

	const dispatch = useAppDispatch()

	const [workoutTypeOpen, setWorkoutTypeOpen] = useState(false);
	const [workoutType, setWorkoutType] = useState(null);
	const [workoutTypeItems, setWorkoutTypeItems] = useState([
		{ label: 'Back', value: 'back' },
		{ label: 'Chest', value: 'chest' },
		{ label: 'Leg', value: 'leg' },
	]);


	const [weightOpen, setWeightOpen] = useState(false);
	const [weight, setWight] = useState(null);

	const weightRange = [];
	for (let i = 80; i < 300; i++) {
		weightRange.push({
			label: i.toString(),
			value: i,
		});
	}
	const [weightItems, setWeightItems] = useState(weightRange);

	const [date, setDate] = useState(new Date())
	const [dateOpen, setDateOpen] = useState(false)

	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<View style={styles.formContainer}>
					<View>
						<Text style={styles.workoutTypeLabel}> Workout Type</Text>
						<View
							style={styles.workoutTypeContainer}>
							<DropDownPicker
								open={workoutTypeOpen}
								value={workoutType}
								items={workoutTypeItems}
								setOpen={setWorkoutTypeOpen}
								setValue={setWorkoutType}
								setItems={setWorkoutTypeItems}
								placeholder={'Choose Workout Type'}
							/>
						</View>
					</View>
					<View style={styles.dateContainer}>
						<View style={styles.dateLabelContainer}>
							<Text style={styles.dateLabel}>Workout Date</Text>
							<Pressable style={styles.dateButton} onPress={() => setDateOpen(true)}>
								<Text style={styles.dateText}> {date.toDateString()} </Text>
							</Pressable>
						</View>
						<DatePicker
							style={styles.datePicker}
							modal
							open={dateOpen}
							date={date}
							onConfirm={(date) => {
								setDateOpen(false)
								setDate(date)
							}}
							onCancel={() => {
								setDateOpen(false)
							}}
						/>
					</View>
					<View>
						<Text style={styles.weightTypeLabel}> Body Weight (LBS)</Text>
						<View
							style={styles.weightTypeContainer}>
							<DropDownPicker
								open={weightOpen}
								value={weight}
								items={weightItems}
								setOpen={setWeightOpen}
								setValue={setWight}
								setItems={setWeightItems}
								placeholder={'Set Body Weight'}
							/>
						</View>
					</View>
					<View style={styles.saveButtonContainer}>
						<Pressable style={styles.dateButton} onPress={() => {
							if (workoutType == null) {
								return;
							}

							dispatch(addWorkout({
								id: uuidv4(),
								date: date.toDateString(),
								type: workoutType,
								weight: weight,
								notes: null
							}));
							onSave();
						}}>
							<Text style={styles.dateText}> Save </Text>
						</Pressable>
					</View>
				</View>
			</SafeAreaView>
		</SafeAreaProvider >
	);
}

const styles = StyleSheet.create({
	workoutTypeLabel: {
		fontSize: 14,
		fontFamily: FONT_FAMILY,
		paddingLeft: 16,
		paddingTop: 20,
	},
	weightTypeLabel: {
		fontSize: 14,
		fontFamily: FONT_FAMILY,
		paddingLeft: 16,
		paddingTop: 20,
	},
	dateLabel: {
		fontSize: 14,
		fontFamily: FONT_FAMILY,
		display: 'flex',
	},
	workoutTypeContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
		marginTop: 10,
	},
	weightTypeContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
		marginTop: 10,
	},
	dateContainer: {
		marginTop: 20,
		marginRight: 20,
		marginLeft: 20,
	},
	saveButtonContainer: {
		marginTop: 20,
		marginRight: 20,
		marginLeft: 20,
	},
	formContainer: {
		display: 'flex',
		flexDirection: 'column',
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	datePicker: {
		display: 'flex',
	},
	dateLabelContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	dateButton: {
		backgroundColor: 'blue',
		fontSize: 14,
		fontFamily: FONT_FAMILY,
		borderStyle: 'solid',
		color: 'white',
		marginTop: 10,
		paddingTop: 10,
		paddingBottom: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff',
	},
	dateText: {
		color: 'white',
		fontSize: 18,
		fontFamily: FONT_FAMILY,
		textAlign: 'center',
	}
});