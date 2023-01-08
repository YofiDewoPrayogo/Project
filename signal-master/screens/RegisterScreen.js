import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, KeyboardAvoidingView, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";
import * as ImagePicker from "expo-image-picker";

const RegisterScreen = ({ navigation }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profilePic, setProfilePic] = useState();

	const getPermissions = async () => {
		if (Platform.OS !== "web") {
			const {
				status,
			} = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				alert("We need permission to access your camera ");
			}
		}
		pickImage();
	};

	const pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.5,
			});
			if (!result.cancelled) {
				setProfilePic(result.uri);
			}
		} catch (error) {
			console.log("Error @pickImage:", error);
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: "Back to Login",
		});
	}, [navigation]);

	const register = () => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				authUser.user.updateProfile({
					displayName: name,
					photoURL:
						profilePic ||
						"setProfilePic://www.cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
				});
			})
			.catch((error) => alert(error.message));
	};

	return (
		<KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
			<StatusBar style="light" />
			<Text h3 style={{ marginBottom: 50 }}>
				Create a Signal account
			</Text>
			<View style={styles.inputContainer}>
				<View style={styles.profileImage}>
					{!profilePic ? (
						<AntDesign
							name="plus"
							size={24}
							color="#FFFF"
							onPress={getPermissions}
						/>
					) : (
						<Image
							source={{ uri: profilePic }}
							style={{ width: 100, height: 100 }}
							onPress={getPermissions}
						/>
					)}
				</View>
				<Input
					placeholder="Full Name"
					autoFocus
					type="text"
					value={name}
					onChangeText={(text) => setName(text)}
				/>
				<Input
					placeholder="Email"
					type="email"
					autoCapitalize="none"
					autoCompleteType="email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					keyboardType="email-address"
				/>
				<Input
					placeholder="Password"
					type="text"
					secureTextEntry
					value={password}
					onChangeText={(text) => setPassword(text)}
					onSubmitEditing={register}
				/>
			</View>
			<Button
				containerStyle={styles.button}
				onPress={register}
				title="Register"
				raised
			/>
		</KeyboardAvoidingView>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		backgroundColor: "white",
	},
	button: {
		width: 200,
		marginTop: 10,
	},
	inputContainer: {
		width: 300,
	},
	profileImage: {
		backgroundColor: "#2c6bed",
		borderRadius: 40,
		height: 80,
		width: 80,
		marginTop: -20,
		marginBottom: 10,
		overflow: "hidden",
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
	},
});
