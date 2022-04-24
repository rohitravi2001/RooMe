import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Provider, Portal, Appbar, Card, Button, Paragraph, Title, Modal, RadioButton } from "react-native-paper";
 
export default function HomePage() {

    const todayData = [
        {
            taskName: 'Dishes',
          },
          {
            taskName: 'Trash',
          },
          {
            taskName: 'Yard Work',
          },
    ];

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

    const roomateData = [
        {
            name: 'Rohit',
          },
          {
            name: 'Krishna',
          },
          {
            name: 'Melody',
          },
          {
            name: 'Morbius',
          },
          {
            name: 'Joe',
          },
    ];

    const Item = ({ task }) => (
        <View style={styles.task}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>{task}</Text>
            <Button icon="check-outline" mode="outlined" style={styles.headerButtons} color="#000000" >Done</Button>
        </View>
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
                <Button icon="account-arrow-left-outline" mode="outlined" style={styles.headerButtons} color="#ffffff" >Sign Out</Button>
                <Appbar.Content title="Group (ID_num)"/>
                <Button icon="lock-outline" mode="outlined" style={styles.headerButtons} color="#ffffff" >Code</Button>
            </Appbar.Header>
        )
    }


    const TodaysTasks = () => { 
        return (  
            <View style={styles.taskBox}> 
                <FlatList
                style={styles.taskFlatListStyle}
                data={todayData}
                renderItem={renderItem}
                keyExtractor={item => item.taskName}
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
                renderItem={renderItem}
                keyExtractor={item => item.taskName}
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
          marginBottom: 5,
          marginTop: 5,
          marginHorizontal: 3
        },
        header: {
            backgroundColor: "#7569be",
            justifyContent: "center",
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

    return (
        <>
        <Header/>
        <ScrollView>
            <Title style={styles.titleText}>Today's Tasks</Title>
                <TodaysTasks/>
            <Title style={styles.titleText}>Upcoming Tasks</Title>
                <UpcomingTasks/>
            <Title style={styles.titleText}>Roomates</Title>
            <Paragraph style={{marginLeft: 10}}>Click circles to see roomates tasks.</Paragraph>
                <RoomateButtons/>
            <View style={styles.container}>
                <Button icon="plus" mode="outlined" style={styles.footerButtons} color="#000000" >Create Tasks</Button>
                <Button icon="circle-edit-outline" mode="outlined" style={styles.footerButtons} color="#000000" >Edit Task</Button>
            </View>
            <Button icon="calendar" mode="outlined" style={styles.footerButtons} color="#000000" >View Calendar</Button>
            
        </ScrollView>
        </>
    )

}   