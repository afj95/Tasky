import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
// Components
import { Header } from "./components";
// redux & actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchingProjects, resetProjectsErrors } from '../../redux/reducers/Projects/projects-actions';
// fakeData
import MyText from '../../components/UI/MyText';
import { navigate } from '../../navigation/RootNavigation';
import Colors from '../../utils/Colors';
import { FontAwesome5 } from '@expo/vector-icons';

export const HomeScreen = () => {
  const dispatch = useDispatch()

  // active - finished
  const [status, setStatus] = useState('active');
  // deleted = true - deleted = false
  const [deleted, setDeleted] = useState(false);

  const user = useSelector((state) => state?.authReducer?.user)
  const projects = useSelector(state => state?.projectsReducer?.projects)

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
        activeOpacity={0.5}
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
        <TouchableOpacity
          onPress={() => setStatus(status === 'active' ? 'finished' : 'active')}
          style={styles.finishedContainer}>
          <MyText>{status === 'active' ? 'finished' : 'active'}</MyText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDeleted(!deleted)}
          style={styles.deletedContainer}>
          <MyText>deleted</MyText>
        </TouchableOpacity>
      </View>
    )
  }

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
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
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
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  finishedContainer: {
    backgroundColor: Colors.secondary,
    padding: 5,
    borderRadius: 8
  },
  deletedContainer: {
    backgroundColor: Colors.secondary,
    padding: 5,
    borderRadius: 8
  },
  projectsContainer: {
    paddingHorizontal: 10,
    flex: 1,
    height: '100%',
    backgroundColor: Colors.primary,
  },
  projectItem: {
    backgroundColor: Colors.secondary,
    width: '100%',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
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