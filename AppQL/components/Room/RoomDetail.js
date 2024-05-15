import { View, Text, ActivityIndicator, Image, ScrollView, Dimensions, TextInput} from "react-native"
import { useContext, useEffect, useState } from "react";
import Apis, { authApi, endpoints } from "../../Apis";
import MyStyle from "../../styles/MyStyle";
import RenderHTML from "react-native-render-html";
import moment from "moment";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from "../../MyContext";


const {height} = Dimensions.get('window')

export default RoomDetail = ({route}) => {
    const [room, setRoom] = useState(null);
    const {roomId} = route.params;
    const [comments, setComment] = useState(null);
    const [content, setContent] = useState();
    const [user, ] = useContext(MyContext);

    useEffect(()=>{
        const loadRoom = async ()=>{
            let res = await Apis.get(endpoints['roomDetail'](roomId));
            console.info(res.data)
            setRoom(res.data);
        }

        const loadComment = async()=>{
            let res = await Apis.get(endpoints['comments'](roomId));
            console.info(res.data)
            setComment(res.data);
        }
        loadRoom();
        loadComment();
    },[roomId])

    const comment = async () => {
        const access_token = await AsyncStorage.getItem('token-access');
        const res = await authApi(access_token).post(endpoints['comments'](roomId), {
            'content': content
        })
        console.info(res.data);
        setComment(current => [res.data, ...current]);
    }

    return <ScrollView>
        <Text style={{...MyStyle.name_room, textAlign: "center"}}>CHI TIẾT PHÒNG TRỌ</Text>
        {room===null?<ActivityIndicator/>:<>
            
            <View style={MyStyle.row}>
                <Image source={{uri: room.image}} style={{width: 100, height: 100}}/>
                <Text> {room.name}</Text>
            </View>
            {/* <Text>{room.description}</Text> */}
            <ScrollView style={{height: 0.6*height}}>
                <RenderHTML source={{html: room.description}}></RenderHTML>
            </ScrollView>
            <Text style={MyStyle.name_room}>BÌNH LUẬN: </Text>
            {user!==null?<View style={{...MyStyle.row, justifyContent:'center'}}>
                <TextInput value={content} onChangeText={t=>setContent(t)} placeholder="Nội dung bình luận...." style={styles.input}></TextInput>
                <TouchableOpacity onPress={comment}>
                    <Text style={styles.button}>Bình luận</Text>
                </TouchableOpacity>
            </View>:""}
            {comments===null?"":<>
                {comments.map(c=><View key={c.id} style={{...MyStyle.row,padding: 5}}>
                    <Image source={{uri: c.user.avatar}} style={{width: 30, height: 30}}></Image>
                    <View>
                        <Text>{c.content}</Text>
                        <Text>{moment(c.created_date).fromNow()}</Text>
                    </View>
                </View>)}
            </>}
        </>}
    </ScrollView>
}