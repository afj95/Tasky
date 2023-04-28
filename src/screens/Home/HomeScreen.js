import React, { useState, useEffect } from 'react';
import { Header } from "./components";
import { useDispatch, useSelector } from 'react-redux';
import { fetchInprogressProjects, fetchUpcomingProjects } from '../../redux/reducers/Projects/projects-actions';
import MyText from '../../components/UI/MyText';
import Colors from '../../utils/Colors';
import {
  View,
  StyleSheet,
  I18nManager
} from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { InProgressComp } from './InProgressComp';
import { UpcomingComp } from './UpcomingComp';
import { t } from '../../i18n';

export const HomeScreen = () => {
  const dispatch = useDispatch()

  // const [status, setStatus] = useState('active');
  // const [deleted, setDeleted] = useState(false);
  const [page, setPage] = useState(1);

  const user = useSelector((state) => state?.authReducer?.user)

  useEffect(() => {
    async function fetchAllProjects() {
      await dispatch(fetchInprogressProjects({
        loadMore: false,
        page, perPage: 5,
        refresh: false,
        in_progress: true
      }))
      await dispatch(fetchUpcomingProjects({
        loadMore: false,
        page, perPage: 5,
        refresh: false,
        in_progress: false
      }))
    }
    fetchAllProjects();
  }, [])

  const _onRefreshInProgress = () => {
    setPage(1)
    dispatch(fetchInprogressProjects({
      loadMore: false,
      page, perPage: 5,
      refresh: true,
      in_progress: true
    }))
  }
  const _onRefreshUpcoming = () => {
    setPage(1)
    dispatch(fetchUpcomingProjects({
      loadMore: false,
      page, perPage: 5,
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
      page, perPage: 5,
      refresh: false,
      in_progress: true
    }))
  }

  const upComingTabPressed = () => {
    dispatch(fetchUpcomingProjects({
      loadMore: false,
      page, perPage: 5,
      refresh: false,
      in_progress: false
    }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header user={user} text={'projects'} />
      </View>
      {/* <Tab.Navigator layoutDirection={I18nManager.isRTL ? 'lrt' : 'ltr'}> */}
      <Tab.Navigator layoutDirection={'rtl'}>
        {/* <Tab.Navigator layoutDirection={'ltr'}> */}
        <Tab.Screen
          listeners={{ tabPress: inProgressTabPressed, }}
          options={{ ...options, tabBarLabel: ({ focused }) => <MyText style={styles.tabBarLabelText(focused)}>inProgressProjects</MyText> }}
          name={t("app.inProgressProjects")}>
          {(props) => (
            <InProgressComp
              {...props}
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
              _onRefresh={_onRefreshUpcoming}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.header}>
  //       <Header user={user} text={'projects'} />
  //     </View>

  //     <View style={styles.projectsContainer}>
  //       {loadings?.projects ? null :
  //         <FlatList
  //           contentContainerStyle={{ paddingBottom: projects?.length ? 30 : 0, flex: projects?.length ? 0 : 1 }}
  //           style={{ flex: 1 }}
  //           keyExtractor={(item, index) => '#' + index.toString()}
  //           data={projects}
  //           ListHeaderComponent={user?.role === 'admin' ? _listHeaderComponent : null}
  //           ListEmptyComponent={_listEmptyComponent}
  //           ListFooterComponent={projects?.length ? _listFooterComponent : null}
  //           showsVerticalScrollIndicator={false}
  //           onRefresh={_onRefresh}
  //           refreshing={false}
  //           renderItem={_renderItem}
  //         />}
  //       {loadings?.projects ?
  //         <View style={styles.loadingContainer}>
  //           <ActivityIndicator color={Colors.primary} size={'small'} animating={loadings?.project} style={{ flex: 1 }} />
  //         </View> : null
  //       }
  //     </View>
  //     <FilterModal
  //       visible={filterVisible}
  //       close={closeModal}
  //       status={status}
  //       setStatus={setStatus}
  //       deleted={deleted}
  //       setDeleted={setDeleted}
  //     />
  //   </View>
  // )
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

  })
});