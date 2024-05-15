import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView,DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Home from './components/Home/Home';
import { useEffect, useState } from 'react';
import Apis, { endpoints } from './Apis';
import Room from './components/Room/Room';
import RoomDetail from './components/Room/RoomDetail';
import MyContext from './MyContext'
import MyUserReducer from './MyUserReducer'
import Login from './components/User/Login';
import Logout from './components/User/Logout';
import Register from './components/User/Register';


const Drawer = createDrawerNavigator();

export default App = ()=>{
  const [user, dispatch] = useReducer(MyUserReducer, null);

  return <MyContext.Provider value={[user, dispatch]}>
    <NavigationContainer>
    <Drawer.Navigator drawerContent={MyDrawerContent} screenOptions={{headerRight: Logout}}>
      <Drawer.Screen name='Home' component={Home} options={{title: "Trang chủ", headerStyle: {backgroundColor: "lightblue"}}}></Drawer.Screen>
      {user===null?<>
        <Drawer.Screen name='Login' component={Login} options={{title: "Đăng nhập"}}/>
        <Drawer.Screen name='Register' component={Register} options={{title: "Đăng ký"}}/>
      </>:<>
        <Drawer.Screen name={user.username} component={Home}/>
      </>}
      <Drawer.Screen name='Room' component={Room} options = {{title: "Danh sách phòng trọ", drawerItemStyle: {display: "none"}}}/>
      <Drawer.Screen name='RoomDetail' component={RoomDetail} options ={{title: "Chi tiết phòng trọ", drawerItemStyle: {display: "none"}}}/>
    </Drawer.Navigator>
  </NavigationContainer>
  </MyContext.Provider>
}

const MyDrawerContent = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    const loadCategory = async ()=>{
      const res = await Apis.get(endpoints['categories']);
      setCategories(res.data)
    }
    loadCategory();
  }, [])

  return <DrawerContentScrollView {...props}>
    <DrawerItemList {...props}/>
    {categories.map(c=><DrawerItem label={c.name} key={c.id} onPress={()=>props.navigation.navigate("Home", {cateId: c.id})}></DrawerItem>)}
  </DrawerContentScrollView>
}