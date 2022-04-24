import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Provider, Portal, Appbar, Card, Button, Paragraph, Title, Modal, RadioButton } from "react-native-paper";

export default function RoomateStatus() {
    
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

    const Item = ({ task }) => (
        <View style={styles.task}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>{task}</Text>
            <Button icon="check-outline" mode="outlined" style={styles.doneButton} color="#000000" >Done</Button>
        </View>
      );
    
      const renderItem = ({ item }) => (
        <Item task={item.taskName} />
      );

      const Header = () => {
        return (
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="_InsertName_" />
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

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
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
            marginTop: 50,
            marginLeft: 10,
        },
        doneButton: {
            borderColor: "#000000",
            borderWidth: 1,
            borderRadius: 20,
            transform: [{scale: 0.75}],   
        },
        pushButton: {
            borderColor: "#000000",
            borderWidth: 1,
            borderRadius: 20,
            transform: [{scale: 0.75}],
            marginTop: 40   
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
        task: {
            flexDirection: "row",
            justifyContent: "space-between",    
            marginLeft: 20,
            marginTop: 10,
            marginBottom: 10,
        },
      });

    return (
        <>
        <Header/>
        <ScrollView contentContainerStyle={{justifyContent: "space-evenly"}}>
            <Title style={styles.titleText}>Today's Tasks</Title>
                <TodaysTasks/>
            <Title style={styles.titleText}>Upcoming Tasks</Title>
                <UpcomingTasks/>
            <Button icon="send" mode="outlined" style={styles.pushButton} color="#000000">Send Push Notification</Button>
        </ScrollView>
        </>
    )
}