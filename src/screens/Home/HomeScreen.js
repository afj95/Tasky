import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInprogressProjects, fetchUpcomingProjects } from '../../redux/reducers/Projects/projects-actions';
import MyText from '../../components/UI/MyText';
import Colors from '../../utils/Colors';
import {
  View,
  StyleSheet
} from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { InProgressComp } from './InProgressComp';
import { UpcomingComp } from './UpcomingComp';
import { t } from '../../i18n';
import { MainHeader } from '../../components/UI/MainHeader';
import * as updates from 'expo-updates';
import { Ionicons } from '@expo/vector-icons';
import { navigate } from '../../navigation/RootNavigation';
import TouchableOpacity from '../../components/UI/TouchableOpacity';
import { useNotification } from '../../hooks/useNotification';

export const HomeScreen = () => {
  const dispatch = useDispatch()

  // const [status, setStatus] = useState('active');
  // const [deleted, setDeleted] = useState(false);
  const [inProgressPage, setInProgressPage] = useState(1);
  const [upcomingPage, setInUpcomingPage] = useState(1);

  const notification = useNotification();

  const user = useSelector((state) => state?.authReducer?.user)

  useEffect(() => {
    async function fetchAllProjects() {
      await dispatch(fetchInprogressProjects({
        loadMore: false,
        inProgressPage, perPage: 5,
        refresh: false,
        in_progress: true
      }))
      await dispatch(fetchUpcomingProjects({
        loadMore: false,
        upcomingPage, perPage: 5,
        refresh: false,
        in_progress: false
      }))
    }
    fetchAllProjects();
  }, [])

  const _onRefreshInProgress = () => {
    setInProgressPage(1)
    dispatch(fetchInprogressProjects({
      loadMore: false,
      inProgressPage, perPage: 5,
      refresh: true,
      in_progress: true
    }))
  }
  const _onRefreshUpcoming = () => {
    setInUpcomingPage(1)
    dispatch(fetchUpcomingProjects({
      loadMore: false,
      upcomingPage, perPage: 5,
      refresh: true,
      in_progress: false
    }))
  }

  const Tab = createMaterialTopTabNavigator();

  const tabBarStyle = {
    width: '85%',
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 10,
    overflow: 'hidden',
  };

  const tabBarIndicatorStyle = {
    backgroundColor: Colors.primary,
    borderRadius: 8,
  }

  const options = {
    tabBarIndicatorStyle,
    tabBarStyle,
    swipeEnabled: false
  }

  const inProgressTabPressed = () => {
    dispatch(fetchInprogressProjects({
      loadMore: false,
      inProgressPage, perPage: 5,
      refresh: false,
      in_progress: true
    }))
  }

  const upComingTabPressed = () => {
    dispatch(fetchUpcomingProjects({
      loadMore: false,
      upcomingPage, perPage: 5,
      refresh: false,
      in_progress: false
    }))
  }

  const AddProjectButton = () => {
    return (
      <TouchableOpacity onPress={() => navigate('AddProject')} style={styles.addProjectButton}>
        <Ionicons
          name={'md-add-circle'}
          size={20}
          color={Colors.appWhite}
          style={{ paddingHorizontal: 2 }}
        />
        {/* <MyText style={styles.addProjectText}>addNewProject</MyText> */}
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MainHeader title={'projects'} RightComponent={user?.role === 'admin' ? AddProjectButton : null} />
      </View>
      {/* <Tab.Navigator layoutDirection={I18nManager.isRTL ? 'lrt' : 'ltr'}> */}
      {__DEV__ || updates.channel[0].startsWith('t') ? <MyText style={{ alignSelf: 'center', width: '100%' }} text={updates.channel || '   null   '} /> : null}
      <Tab.Navigator layoutDirection={'rtl'}>
        <Tab.Screen
          listeners={{ tabPress: inProgressTabPressed, }}
          options={{ ...options, tabBarLabel: ({ focused }) => <MyText style={styles.tabBarLabelText(focused)}>inProgressProjects</MyText> }}
          name={t("app.inProgressProjects")}>
          {(props) => (
            <InProgressComp
              {...props}
              page={inProgressPage}
              setPage={setInProgressPage}
              _onRefresh={_onRefreshInProgress}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          listeners={{ tabPress: upComingTabPressed }}
          options={{ ...options, tabBarLabel: ({ focused }) => <MyText style={styles.tabBarLabelText(focused)}>upcomingProjects</MyText> }}
          name={t("app.upcomingProjects")}>
          {(props) => (
            <UpcomingComp
              {...props}
              page={upcomingPage}
              setPage={setInUpcomingPage}
              _onRefresh={_onRefreshUpcoming}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appWhite
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    width: '100%'
  },
  filterContainer: {
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse'
  },
  projectsContainer: {
    paddingHorizontal: 10,
    flex: 1,
    height: '100%'
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
  },
  footerContainer: {
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  projectItem: {
    backgroundColor: Colors.white,
    width: '100%',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Colors.secondary,
    alignSelf: 'center',
    borderRadius: 8,
    padding: 5,
  },
  projectName: {
    fontFamily: 'bold',
    fontSize: 16
  },
  projectDescription: {
    fontFamily: 'light',
    fontSize: 15,
  },
  seperator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%'
  },
  projectStartDate: {
    fontFamily: 'light',
    textAlign: 'left',
    marginTop: 8,
    fontSize: 10
  },
  emptyImage: {
    width: '90%',
    height: '50%',
  },
  emptyContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontFamily: 'bold',
    color: Colors.primary,
    fontSize: 18
  },
  tasksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '8%'
  },
  deletedIcon: {
    height: '50%',
    backgroundColor: 'red',
    width: 10,
    position: 'absolute',
    end: 10,
  },
  finishedIcon: {
    height: '50%',
    backgroundColor: 'green',
    width: 10,
    position: 'absolute',
    end: 25,
  },
  tabBarLabelText: focused => ({
    fontFamily: focused ? 'bold' : 'light',
    color: focused ? Colors.primary : Colors.text,
    fontSize: 14,
    width: '100%',
    textAlign: 'center',

  }),
  addProjectButton: {
    alignItems: 'center',
  },
  addProjectText: {
    fontSize: 10,
    color: Colors.appWhite,
    fontFamily: 'light'
  }
});