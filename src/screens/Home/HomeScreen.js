import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
// Components
import { FilterModal, Header } from "./components";
// redux & actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchingProjects, resetProjectsErrors } from '../../redux/reducers/Projects/projects-actions';
// fakeData
import MyText from '../../components/UI/MyText';
import { navigate } from '../../navigation/RootNavigation';
import Colors from '../../utils/Colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';

export const HomeScreen = () => {
  const dispatch = useDispatch()

  // active - finished
  const [status, setStatus] = useState('active');
  // deleted = true - deleted = false
  const [deleted, setDeleted] = useState(false);
  const [filterVisible, setVisible] = useState(false);

  const user = useSelector((state) => state?.authReducer?.user)
  const projects = useSelector(state => state?.projectsReducer?.projects)
  // const fetchingProjectsError = useSelector(state => state?.projectsReducer?.fetchingProjectsError)

  // useEffect(() => {
  //   // TODO: Localize
  //   if (fetchingProjectsError) {
  //     showMessage({
  //       message: '' + fetchingProjectsError,
  //       type: 'danger',
  //       duration: 1500
  //     })
  //   }
  // }, [fetchingProjectsError])

  useEffect(() => {
    dispatch(resetProjectsErrors())
    dispatch(fetchingProjects(status, deleted))
  }, [status, deleted])

  const _onRefresh = () => {
    dispatch(resetProjectsErrors())
    dispatch(fetchingProjects(status, deleted))
  }

  const onProjectPressed = (item) => {
    navigate('ProjectDetails', {
      screen: 'ProjectDetailsScreen',
      params: {
        project: item,
        status,
        deleted
      }
    })
  }

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onProjectPressed(item)}
        activeOpacity={0.85}
        style={styles.projectItem}>
        <View style={{ alignItems: 'center' }}>
          <MyText text={item?.projectName1} />
          <MyText text={item?.projectName2} />
        </View>
        <View style={styles.tasksContainer}>
          <FontAwesome5 name={'tasks'} color={Colors.appWhite} />
          <MyText text={item?.tasks?.length} />
        </View>
        {item?.deleted && <View style={styles.finishedIcon} />}
        {item?.status === 'finished' && <View style={styles.deletedIcon} />}
      </TouchableOpacity>
    )
  }

  const _listHeaderComponent = () => {
    return (
      <View style={styles.filterContainer}>
        <Ionicons
          name={'md-filter'}
          size={30}
          color={Colors.primary}
          onPress={() => setVisible(true)}
        />
      </View>
    )
  }

  const closeModal = () => setVisible(false)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header user={user} text={'projects'} />
      </View>

      <View style={styles.projectsContainer}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 50 }}
          keyExtractor={(item, index) => '#' + index.toString()}
          data={projects || []}
          ListHeaderComponent={_listHeaderComponent}
          showsVerticalScrollIndicator={false}
          onRefresh={_onRefresh}
          refreshing={false}
          renderItem={_renderItem}
        />
      </View>
      <FilterModal
        visible={filterVisible}
        close={closeModal}
        status={status}
        setStatus={setStatus}
        deleted={deleted}
        setDeleted={setDeleted}
      />
    </View>
  )
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
    width: '100%',
    zIndex: 1,
  },
  filterContainer: {
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  },
  projectsContainer: {
    paddingHorizontal: 10,
    flex: 1,
    height: '100%'
  },
  projectItem: {
    backgroundColor: Colors.white,
    width: '100%',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Colors.secondary,
    alignSelf: 'center',
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  tasksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '8%'
  },
  finishedIcon: {
    height: '100%',
    backgroundColor: 'red',
    width: 10,
    position: 'absolute',
    end: 10,
  },
  deletedIcon: {
    height: '100%',
    backgroundColor: 'green',
    width: 10,
    position: 'absolute',
    end: 25,
  },
});