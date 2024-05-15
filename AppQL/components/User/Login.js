import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native"
import Apis, { authApi, endpoints } from "../../Apis";
import MyContext from "../../MyContext";
import MyStyle from "../../styles/MyStyle"
import Styles from "./Styles";

const Login = ({navigation})=>{
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [user, dispatch] = useContext(MyContext);
    const [loading, setLoading] = useState();

    const login = async () => {
        setLoading(true);
        try {
            let res = await Apis.post(endpoints['login'], {
                'client_id': 'OGv9qjli4n6ObltJw8AGW4IlAEZecpI2qu0Rxdh9',
                'client_secret': 'RzKwHdgMqGw2jIuaaL6lxGqbl4uCpuE87Jsc33RIUUwdY4Ec6glAJLA5eJMPpiMtyHLMj61s9aG1dxOZbOuHnfynJ56ouF0LpieBbc785UquoCii24HNHvzJaz0hQylQ',
                'username': username,
                'password': password,
                'grant_type': 'password'
            })
            console.info(res.data)
            await AsyncStorage.setItem('token-access', res.data.access_token)
            let user = await authApi(res.data.access_token).get(endpoints['current_user']);
            console.info(user.data)
            dispatch({
                        'type': 'login',
                        'payload': {
                            'username': user.data.username
                        }
                    })
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
        } finally{
            setLoading(false);
        }
        // if(username==="admin"&&password==="123"){
        //     dispatch({
        //         'type': 'login',
        //         'payload': {
        //             'username': 'admin'
        //         }
        //     })
        // }else
        //     alert("Đăng nhập không thanh công!");
    }

    return <View style={MyStyle.container}>
        <Text style={MyStyle.subject}>ĐĂNG NHẬP</Text>
        <TextInput value={username} onChangeText={t=>setUsername(t)} placeholder="Enter username..." style={Styles.input}></TextInput>
        <TextInput secureTextEntry={true} value={password} onChangeText={t=>setPassword(t)} placeholder="Enter password..." style={Styles.input}></TextInput>
        {loading===true?<ActivityIndicator/>:<>
            <TouchableOpacity onPress={login}>
                <Text style={Styles.button}>Login</Text>
            </TouchableOpacity>
        </>}
    </View>
}

export default Login;