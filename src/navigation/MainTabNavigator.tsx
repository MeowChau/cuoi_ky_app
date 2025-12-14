import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../theme/colors';
import { CHCText } from '../presentation/components';

// Import screens
import HomeScreen from '../presentation/containers/Home';
import TripsScreen from '../presentation/containers/Trips';
import AIAssistantScreen from '../presentation/containers/AIAssistant';
import ProfileScreen from '../presentation/containers/Profile';

export type MainTabParamList = {
  HomeTab: undefined;
  TripsTab: undefined;
  AITab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

// Icon component (dùng emoji tạm)
const TabIcon = ({ focused, icon }: { focused: boolean; icon: string }) => (
  <View style={[styles.iconContainer, focused && styles.iconActive]}>
    <CHCText type="Heading2" style={{ fontSize: 24 }}>
      {icon}
    </CHCText>
  </View>
);

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.Primary500,
        tabBarInactiveTintColor: Colors.Gray400,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="🏠" />,
        }}
      />
      <Tab.Screen
        name="TripsTab"
        component={TripsScreen}
        options={{
          tabBarLabel: 'Chuyến đi',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="🗺️" />,
        }}
      />
      <Tab.Screen
        name="AITab"
        component={AIAssistantScreen}
        options={{
          tabBarLabel: 'Trợ lý AI',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="🤖" />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="👤" />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: Colors.White,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray200,
    elevation: 8,
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  iconActive: {
    backgroundColor: Colors.Primary100,
  },
});