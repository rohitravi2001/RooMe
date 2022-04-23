import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { CreateATaskScreen } from "./CreateATaskScreen.main";
import { AssignATaskScreen } from "./AssignATaskScreen.main";

export type RootStackParamList = {
AssignATaskScreen: undefined;
  CreateATaskScreen: undefined;
  GetName: undefined; 
  CreateAGroupScreen: undefined;
  GroupScreen: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export function RootStackScreen() {
  const options = { headerShown: false };
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="CreateATaskScreen">

     
         <RootStack.Screen
          name="CreateATaskScreen"
          options={options}
          component={CreateATaskScreen}
        />
        <RootStack.Screen
          name="AssignATaskScreen"
          options={options}
          component={AssignATaskScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}