import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useAuthState } from "react-firebase-hooks/auth";
import { Provider, Portal, Appbar, Card, Button, Paragraph, Title, Modal, RadioButton } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, setDoc,where, query,getDocs, onSnapshot, orderBy, deleteDoc, doc, updateDoc, getDoc, getDocFromCache } from "firebase/firestore";
import { RollInRight } from "react-native-reanimated";
 
export function HomePage({navigation}) {

    const auth = getAuth();

    const currentUserId = auth.currentUser!.uid;
   

    const db = getFirestore();
    const peopleCollection = collection(db, "people");
    const peopleRef = doc(peopleCollection, currentUserId.toString());

    const groupsCollection = collection(db, "groups");

   const [name, setName] = useState("");
   const [groupName, setGroupName] = useState("");
   const [groupCode, setGroupCode] = useState("");
   const [todayData, setTodayData] = useState([]);
   const [upcomingData, setUpcomingData] = useState([]);
   const [roomateData, setRoomateData] = useState([]);


    

    useEffect( () => {
       
        const fetchData = async () => {
            //setRoomateData([{name: "Rohit"}, {name:"Krishma"}]);
            try{
                const q = query(collection(db, "people"), where("uid", "==", currentUserId));
                const docu = await getDocs(q);
                const docSnap = docu.docs[0];
                setName(docSnap.data().name);
                setGroupName(docSnap.data().groupName);
                setGroupCode(docSnap.data().groupCode);
                /*
                let gc = docSnap.data().groupCode;
                console.log(name);
                
                const groupRef = doc(groupsCollection, gc.toString());
                const newDocSnap = await getDoc(groupRef);
                let members = newDocSnap.data().members;
                //loop through everything in the members
                let lst = [];
                for (let i = 0; i < members.length; i++) {
                    const newPeopleRef = doc(peopleCollection, members[i]);
                    let docSnap2 = await getDoc(newPeopleRef);
                    let name = docSnap2.data().name;
                    if (!(members[i] === currentUserId)) {
                        lst.push({name: name, uid: docSnap2.data().uid});
                    }
                }
                */
                
            }catch (err) {
                console.error(err);
                console.log("hi");
              }


        }
        fetchData().catch(console.error);
        

      
      }, []);

      useEffect (() => {
          //do only if groupCode is not empty
          console.log(groupCode);

            if (groupCode !== "") {
                const unsub = onSnapshot(doc(db, "groups", groupCode.toString()), (doc) => {
                let lst = [];
                //loop through doc.data().members
                let members = doc.data().members;
                let memberNames = doc.data().memberNames;
                for (let i = 0; i < members.length; i++) {
                    if (!(members[i] === currentUserId)) {
                        lst.push({name: memberNames[i], uid: members[i]});
                    }
                }
                setRoomateData(lst);
                console.log(lst);
                return unsub;
            }); 
        }; 

      }, [groupCode]);


    

      function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      
      function formatDate(date) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('-');
      }
      

      useEffect (() => {
          //console.log("HELLO");
        //do only if groupCode is not empty
        let todayDate = formatDate(new Date());
       
          if (groupCode !== "") {
              const dateCollection = collection(db, "groups", groupCode.toString(), todayDate);
              const unsubscribe = onSnapshot(query(dateCollection), (querySnapshot) => {
                let lst = [];
                querySnapshot.forEach((doc: any) => {
                    if (doc.data().personUID === currentUserId) {
                        lst.push({taskName: doc.data().task});
                    } 
                  });
                    setTodayData(lst);
                    //console.log(lst);
              return unsubscribe;
          }); 
      }; 

    }, [groupCode]);


    useEffect (() => {
        console.log("HELLO");
      //do only if groupCode is not empty
    
      if (groupCode !== "") {
        let lst = [];
        let currDate = new Date();
        currDate.setDate(currDate.getDate() + 1);
        let todayDate = formatDate(currDate);
        let count = 0;
        const unsub = onSnapshot(doc(db, "groups", groupCode.toString()), async (doc) => {
            let dateCollection = collection(db, "groups", groupCode.toString(), todayDate);
            let querySnapshot = await getDocs(dateCollection);
            while (count < 3 && querySnapshot.docs.length > 1) {
               // console.log(todayDate);
                querySnapshot.forEach((doc) => {
                    if (doc.data().personUID === currentUserId  && count < 3){
                        lst.push({taskName: doc.data().task, date: todayDate});
                        count++;
                    }
                  });
                currDate.setDate(currDate.getDate() + 1);
                todayDate = formatDate(currDate);
                dateCollection = collection(db, "groups", groupCode.toString(), todayDate);
                querySnapshot = await getDocs(dateCollection);
                
            };
            setUpcomingData(lst);
            console.log(lst);
        }); 
      
        return unsub;
        }; 

  }, [groupCode]);
    


/*
    const upcomingData = [
        {
            taskName: 'Vaccuum',
          },
          {
            taskName: 'Bathroom',
          },
          {
            taskName: 'Groceries',
          },
    ];
    */


    const Item = ({ task }) => (
        <View style={styles.task}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>{task}</Text>
            <Button icon="check-outline" mode="outlined" style={styles.headerButtons} color="#000000" >Done</Button>
        </View>
      );

      const UpcomingTaskItem = ({ task, date }) => (
        <View style={styles.task}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>{task}</Text>
            <Button  mode="contained" style={styles.headerButtons} color="#7569BE" >{date}</Button>
        </View>
      );
    
      const renderUpcomingItem = ({ item }) => (
        <UpcomingTaskItem task={item.taskName} date = {item.date} />
      );

      const renderItem = ({ item }) => (
        <Item task={item.taskName} />
      );

      

      const RoomateButton = ({ name }) => (
        <View style={{flexDirection: "column", justifyContent: "space-evenly"}}>
            <Button mode="contained" style={styles.roomateButtons}>
                {name.charAt(0)}
            </Button>
            <Text style={{marginLeft: 35}}>
                {name}
            </Text>    
        </View>
        
        
        
      );

      const roomateRenderItem = ({ item }) => (
        <RoomateButton name={item.name}/>
      );

    // given name of task, loop through data, find task, and 
    // remove it from data
    const completeTask = ({nameOfTask, data}) => {

        const removeTask = (nameOfTask) => {

        }
        data.forEach(removeTask) 
    }

    const Header = () => {

        return (
            <Appbar.Header style={styles.header}>
                <Button icon="account-arrow-left-outline" mode="outlined" style={styles.headerButtons} color="#ffffff" onPress = {() => {signOut(auth)}} >Sign Out</Button>
                <Appbar.Content title={groupName}/>
                <Button icon="lock-outline" mode="outlined" style={styles.headerButtons} color="#ffffff" >Code</Button>
            </Appbar.Header>
        )
    }

    const ListEmptyComponent = () => {
        return (
          <View style = {{padding: 15, alignItems: "center", justifyContent: "center"}}>
            <Text style = {{color: "grey", fontSize: 20}}>You Have No Tasks Today!</Text>
         </View>
          );
        }

    const SecondListEmptyComponent = () => {
            return (
              <View style = {{padding: 15, alignItems: "center", justifyContent: "center"}}>
                <Text style = {{color: "grey", fontSize: 20}}>No Upcoming Tasks!</Text>
             </View>
              );
    }


    const TodaysTasks = () => { 
        return (  
            <View style={styles.taskBox}> 
                <FlatList
                style={styles.taskFlatListStyle}
                data={todayData}
                renderItem={renderItem}
                keyExtractor={item => item.taskName}
                ListEmptyComponent={ListEmptyComponent}
                />
               
            </View>  
        )
    }


    const UpcomingTasks = () => {
        return (  
            
            <View style={styles.taskBox}> 
                <FlatList
                style={styles.taskFlatListStyle}
                data={upcomingData}
                renderItem={renderUpcomingItem}
                keyExtractor={item => item.taskName}
                ListEmptyComponent={SecondListEmptyComponent}

                />
            </View>  
            
        )
    }

    const RoomateButtons = () => {
        return(
            <View style={styles.roomateButtonsBackground}>
                <FlatList 
                    style={styles.roomateButtonFlatListStyle}
                    contentContainerStyle={{justifyContent: "space-evenly"}}
                    horizontal={true}
                    data={roomateData}
                    renderItem={roomateRenderItem}
                    keyExtractor={item => item.name}
                />
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: "#fff",
          padding: 10,
          marginHorizontal: 3
        },
        header: {
            backgroundColor: "#7569be",
            justifyContent: "center",
            textAlign: "center"
        },
        titleText: {
            marginTop: 10,
            marginLeft: 10,
        },
        headerButtons: {
            borderColor: "#ffffff",
            borderWidth: 1,
            borderRadius: 20,
            transform: [{scale: 0.75}],   
        },
        footerButtons: {
            borderColor: "#000000",
            borderWidth: 1,
            borderRadius: 20,
            transform: [{scale: 0.9}], 
            marginTop: 10  
        },
        taskBox: {
            borderColor: "#000000",
            borderWidth: 1,
            borderRadius: 20,
            flexDirection: "column",
            flex: 1,
            transform: [{scale: 0.9}],
            marginTop: 5,
            marginBottom: 10,
        },
        taskFlatListStyle: {
            marginTop: 10,

        },
        roomateButtonFlatListStyle: {
            marginTop: 10,
            marginBottom: 10,
        },
        roomateButtonsBackground: {
            backgroundColor: "#ebe1ff",
            borderColor: "#ebe1ff",
            borderWidth: 1,
            borderRadius: 20,
            flexDirection: "column",
            fontSize: 40,
            flex: 1,
            transform: [{scale: 0.9}],
            marginTop: 10,
            marginBottom: 10,
            height: 140,
        },
        roomateButtons: {
            backgroundColor: "#7569be",
            borderColor: "#7569be",
            borderWidth: 1,
            borderRadius: 40,
            height: 80,
            width: 80,
            transform: [{scale: 1}],
            justifyContent: "space-between",
            marginRight: 15,
            marginLeft: 15,
        },
        task: {
            flexDirection: "row",
            justifyContent: "space-between",    
            marginLeft: 20,
        },
      });
      if (groupCode == ""){
        return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#7569be"}}>
            <Text style = {{color: "white", fontSize: 50, fontWeight: "bold"}}>RooMe</Text>
        </View>);

    } else {
    return (
        
        <>
        <Header/>
        <ScrollView>
            <Title style={styles.titleText}>Today's Tasks</Title>
                <TodaysTasks/>
            <Title style={styles.titleText}>Upcoming Tasks</Title>
                <UpcomingTasks/>
            <Title style={styles.titleText}>Roommates</Title>
                <RoomateButtons/>
            <View style={styles.container}>
                <Button icon="plus" mode="outlined" style={styles.footerButtons} color="#000000" onPress = {() => {navigation.navigate('CreateATaskScreen', {name: name, groupCode: groupCode, groupName: groupName})}}  >Create Tasks</Button>
                <Button icon="circle-edit-outline" mode="outlined" style={styles.footerButtons} color="#000000" >Edit Tasks</Button>
            </View>
            <Button icon="clipboard-account-outline" mode="outlined" style={styles.footerButtons} color="#000000" onPress = {() => {navigation.navigate('AssignATaskScreen', {name: name, groupCode: groupCode, groupName: groupName})}}>Assign Tasks</Button>
            <Button icon="calendar" mode="outlined" style={styles.footerButtons} color="#000000" >View Calendar</Button>
            
        </ScrollView>
        </>
    ); }

}   
