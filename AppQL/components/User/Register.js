import { useContext, useState } from "react";
import { ActivityIndicator, Dimensions, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import Apis, { authApi, endpoints } from "../../Apis";
import MyContext from "../../MyContext";
import MyStyle from "../../styles/MyStyle"
import Styles from "./Styles";
import * as ImagePicker from 'expo-image-picker';
import { append } from "domutils";


const {width} = Dimensions.get('window');

const Register = ({navigation})=>{
    const [user, setUser] = useState({
        'first_name': "",
        'last_name': "",
        'username': "",
        'password': "",
        'avatar': ""
    });

    const [loading, setLoading] = useState();

    const register = async () => {
        setLoading(true);
        try {
            let form = new FormData();
            for(key in user){
                if(key==='avatar'){
                    form.append(key, {
                        uri: user[key].uri,
                        name: user[key].fileName,
                        type: user[key].type
                    })
                }else
                    form.append(key, user[key]);
            }
            const res = await Apis.post(endpoints['register'], form, {
                headers:{
                    "Content-Type": 'multipart/formdata'
                }
            })

            console.info(res.data);

            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
        } finally{
            setLoading(false);
        }
    }

    const change = (field, value)=> {
        setUser(current => {
            return {...current, [field]: value}
        })
    }

    const picker = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status!=="granted"){
            alert("Permission denied!");
        }else{
            const res = await ImagePicker.launchImageLibraryAsync();
            if(!res.canceled){
                change('avatar', res.assets[0]);
            }
        }
    }

    return <View style={MyStyle.container}>
        <Text style={MyStyle.subject}>ĐĂNG KÝ</Text>
        <TextInput value={user.first_name} onChangeText={t=>change('first_name',t)} placeholder="Tên..." style={Styles.input}></TextInput>
        <TextInput value={user.last_name} onChangeText={t=>change('last_name',t)} placeholder="Họ và tên lót..." style={Styles.input}></TextInput>
        <TextInput value={user.username} onChangeText={t=>change('username',t)} placeholder="Tài khoản..." style={Styles.input}></TextInput>
        <TextInput secureTextEntry={true} value={user.password} onChangeText={t=>change('password',t)} placeholder="Mật khẩu..." style={Styles.input}></TextInput>
        <TextInput secureTextEntry={true} placeholder="Nhập lại mật khẩu..." style={{...Styles.input}}></TextInput>
        <TouchableOpacity onPress={picker}>
            <Text style={{...Styles.input, width: width}}>Chọn avatar....</Text>
        </TouchableOpacity>

        {user.avatar!==""?<Image source={{uri: user.avatar.uri}} style={{width: 100, height: 100, margin: 10}}></Image>:""}

        {loading===true?<ActivityIndicator/>:<>
            <TouchableOpacity onPress={register}>
                <Text style={Styles.button}>ĐĂNG KÝ</Text>
            </TouchableOpacity>
        </>}
    </View>
}

export default Register;