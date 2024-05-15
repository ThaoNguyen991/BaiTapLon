import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native"
import { useEffect, useState } from "react";
import MyStyle from "../../styles/MyStyle";
import Apis, { endpoints } from "../../Apis";
import moment from "moment";
import { TouchableOpacity } from "react-native";


export default Room = ({route, navigation})=>{
    const {houseId} = route.params;
    const [rooms, setRoom] = useState(null);

    useEffect(()=>{
        const loadRoom = async () => {
            console.info(endpoints['rooms'](houseId))
            const res = await Apis.get(endpoints['rooms'](houseId));
            console.info(res.data);
            setRoom(res.data)
        }
        loadRoom();
    }, [houseId]);

    const goToRoomDetail=(roomId)=>{
        navigation.navigate("RoomDetail", {"roomId": roomId})
    }

    return <View style={{...MyStyle.container}}>
        <Text style={{...MyStyle.name_room, textAlign: "center"}}>DANH SÁCH PHÒNG TRỌ</Text>
        {rooms===null?<ActivityIndicator color={'green'}/>:<ScrollView>
            {rooms.map(c=>(
                <View key={c.id} style={[MyStyle.row, {padding: 5}]}>
                    <View>
                        <TouchableOpacity onPress={()=>goToRoomDetail(c.id)}>
                            <Image style={{width: 100, height: 100}} source={{uri: c.image}}/>
                        </TouchableOpacity>
                        
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>goToRoomDetail(c.id)}>
                            <Text style={MyStyle.title}>{c.name_room}</Text>
                            <Text style={{marginLeft: 5}}>{moment(c.created_date).fromNow()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            </ScrollView>}
    </View>
}