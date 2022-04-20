import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CreateAGroupScreen} from "./CreateAGroupScreen.main";
import { GroupScreen } from "./GroupScreen.main";
import { GetName } from "./GetName";
import { NavigationContainer } from "@react-navigation/native";
import { CreateATaskScreen } from "./CreateATaskScreen.main";

export type RootStackParamList = {
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
      <RootStack.Navigator initialRouteName="GetName">
      <RootStack.Screen
          name="GetName"
          component={GetName}
          options={options}
        />
        <RootStack.Screen
          name="GroupScreen"
          component={GroupScreen}
          options={options}
        />
        <RootStack.Screen
          name="CreateAGroupScreen"
          options={options}
          component={CreateAGroupScreen}
        />
         <RootStack.Screen
          name="CreateATaskScreen"
          options={options}
          component={CreateATaskScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}