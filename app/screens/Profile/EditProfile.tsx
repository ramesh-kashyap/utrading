import React ,{useState, useEffect} from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import {Feather}  from '@expo/vector-icons';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { IMAGES } from '../../constants/Images';
import { COLORS } from '../../constants/theme';
import Api from "../../../services/Api";


const EditProfile = () => {

    const [username, setUsername]= useState("");
   const [loading, setLoading] = useState(false);
   
const updateUsername = async () => {
    if (!username.trim()) {
        Alert.alert("Error", "Username cannot be empty!");
        return;
    }
    setLoading(true);
    try {
        const response = await Api.post("change-name", {
             name : username
            });
        if (response.data.success) {
            Alert.alert("Success", response.data.message || "Username updated successfully!");

        } else {
            Alert.alert("Error", response.data.message || "Failed to update username.");
        }
    } catch (error: any) {
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
            } finally {
        setLoading(false); 
    }
};
       
   
const getInfo = async () => {
    setLoading(true);
    try {
        const response = await Api.get("/getinfo");
        if (response.data) {
            setUsername(response.data.username[0].name);
            // console.log(response.data.username[0].name);
        } else {
            setUsername(response.data);
            console.error(response.data,"error");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        setUsername("Error fetching username");
    }
    finally {
        setLoading(false); // Ensure UI updates after fetching
    }
};


   useEffect(()=>{
    getInfo();
   },[]);
    
    const {colors} : {colors : any} = useTheme();

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
            <Header
                leftIcon='back'
                title='Edit Profile'
            />
            <ScrollView
                contentContainerStyle={{
                    flexGrow:1
                }}
            >
                <View
                    style={[GlobalStyleSheet.container,{flex:1}]}
                >
                    <View
                        style={{
                            flex : 1
                        }}
                    >
                        <View
                            style={{
                                alignItems:'center',
                                marginBottom:30,
                                marginTop:10,
                            }}
                        >
                            <View>
                                <Image
                                    source={IMAGES.profilePic}
                                    style={{
                                        height:100,
                                        width:100,
                                        borderRadius:100,
                                    }}
                                />
                                <TouchableOpacity
                                    style={{
                                        height:32,
                                        width:32,
                                        backgroundColor:COLORS.primary,
                                        borderRadius:24,
                                        borderWidth:3,
                                        borderColor:colors.background,
                                        position:'absolute',
                                        bottom:0,
                                        right:0,
                                        alignItems:'center',
                                        justifyContent:'center',
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:14,
                                            width:14,
                                            tintColor:COLORS.title,
                                        }}
                                        source={IMAGES.edit}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Username</Text>
                            <Input
                                placeholder={'Type your usename'}
                                // defaultValue={username}
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>
                        {/* <View style={GlobalStyleSheet.inputGroup}>
                            <Text style={[GlobalStyleSheet.label,{color:colors.title}]}>Email</Text>
                            <Input
                                placeholder={'Type your email'}
                                defaultValue={'yatin@example.com'}
                            />
                        </View> */}
                    </View>
                    <View style={{padding:15}}>
                        <Button
                            onPress={updateUsername}
                            title={loading ? "Saving..." : "Save"}
                        />
                    </View> 
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditProfile;