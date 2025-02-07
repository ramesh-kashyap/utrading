import React, {useState} from 'react';
import { View, Text, SafeAreaView, ScrollView,Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Api from "../../../services/Api";
const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] =useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChangePassword = async () =>{
//         console.log("Current Password:", currentPassword);
// console.log("New Password:", newPassword);
// console.log("Confirm Password:", confirmPassword);

        try{
             const response = await Api.post("/change-password",{
                currentPassword: currentPassword,
                newPassword: newPassword,
                confirmPassword :confirmPassword,
             })   
             console.log(response.data);
             if(response.data.success){
              Alert.alert("Success",response.data.success);
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
             } 
             else{
                Alert.alert("Error",response.data.message);
             }         
        }
        catch (error: any) {
            console.error("Error:", error);
        
            // Check if it's an Axios error
            if (error.response) {
                const errorMessage = 
                    error.response.data && 
                    error.response.data.errors && 
                    error.response.data.errors[0] && 
                    error.response.data.errors[0].msg 
                    ? error.response.data.errors[0].msg 
                    : (error.response.data && error.response.data.message ? error.response.data.message : "An unknown error occurred. Please try again.");
                
                Alert.alert("Error", errorMessage);
            } else if (error.request) {
                Alert.alert("Error", "No response from server. Please try again later.");
            } else {
                Alert.alert("Error", "An unexpected error occurred.");
            }
        }
        

    }

    const {colors} : {colors : any} = useTheme();

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
            <Header
                title='Change Password'
                leftIcon='back'
            />

            <ScrollView
                contentContainerStyle={{
                    flexGrow:1
                }}
            >    
                <View style={[GlobalStyleSheet.container,{flex:1}]}>
                    <View style={{flex:1,paddingTop:5}}>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Current password</Text>
                            <Input
                                type='password'
                                placeholder='Current password'
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                            />
                        </View>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>New password</Text>
                            <Input
                                type='password'
                                placeholder='New password'
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />
                        </View>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Confirm password</Text>
                            <Input
                                type='password'
                                placeholder='Confirm password'
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            paddingHorizontal:15,
                            paddingVertical:15,
                        }}
                    >
                        <Button
                            // onPress={() => {}}
                            title='Update' onPress={handleChangePassword}
                        />
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>   
    )
}

export default ChangePassword;