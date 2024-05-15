import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native"
import { useEffect, useState } from "react";
import MyStyle from "../../styles/MyStyle";
import Apis, { endpoints } from "../../Apis";
import moment from "moment";
import { TouchableOpacity } from "react-native";

const Home = ({route, navigation}) => {
    const [houses, setHouses] = useState(null);
    const cateId = route.params?.cateId;

    useEffect(()=>{
        let url = endpoints['houses'];
        if(cateId !== undefined&&cateId !== ""){
            url = `${url}?category_id=${cateId}`;
        }
        const loadHouse = async () => {
            const res = await Apis.get(url);//?category_id=
            setHouses(res.data.results)
        }
        loadHouse();
    },[cateId]);

    const goToRoom = (houseId) => {
        navigation.navigate("Room", {"houseId": houseId})
    }

    return <View style={MyStyle.container}>
        <Text style={[MyStyle.address, {textAlign: "center"}]}>DANH SÁCH NHÀ TRỌ</Text>
        {houses===null?<ActivityIndicator color={'green'}/>:<ScrollView>
            {houses.map(c=>(
                <View key={c.id} style={[MyStyle.row, {padding: 5}]}>
                    <View>
                        <TouchableOpacity onPress={()=>goToRoom(c.id)}>
                            <Image style={{width: 100, height: 100}} source={{uri: c.image}}/>
                        </TouchableOpacity>
                        
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>goToRoom(c.id)}>
                            <Text style={MyStyle.title}>{c.address}</Text>
                            <Text style={{marginLeft: 5}}>{moment(c.created_date).fromNow()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>}
    </View>
}

export default Home;