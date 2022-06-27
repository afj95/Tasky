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
        <View style={{alignItems: 'center'}}>
          <MyText text={item?.projectName1} />
          <MyText text={item?.projectName2} />
        </View>
        <View style={styles.tasksContainer}>
          <FontAwesome5 name={'tasks'} />
          <MyText text={item?.tasks?.length} />
        </View>
        {item?.deleted && <View style={styles.finishedIcon} /> }
        {item?.status === 'finished' && <View style={styles.deletedIcon} /> }
      </TouchableOpacity>
    )
  }

  const _listHeaderComponent = () => {
    return (
      // <Ionicons name={'filter'} size={25} style={styles.filterIcon} onPress={openFilterModal} />
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setStatus(status === 'active' ? 'finished' : 'active')}
          style={styles.finishedContainer(status)}>
          <MyText>{status === 'active' ? 'finished' : 'active'}</MyText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDeleted(!deleted)}
          style={styles.deletedContainer(deleted)}>
          <MyText>deleted</MyText>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      <View style={styles.header}>
        <Header user={user} text={'projects'} />
      </View>

      <View style={styles.projectsContainer}>
        <FlatList
          keyExtractor={(item, index) => '#' + index.toString()}
          data={projects || []}
          ListHeaderComponent={_listHeaderComponent}
          showsVerticalScrollIndicator={false}
          onRefresh={_onRefresh}
          refreshing={false}
          renderItem={_renderItem}
        />
      </View>
    </>
  )
};

const styles = StyleSheet.create({
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
  finishedContainer: (status) => ({
    backgroundColor: status === 'finished' ? '#888' : '#b9b9b9',
    padding: 5,
    borderRadius: 8
  }),
  deletedContainer: (deleted) => ({
    backgroundColor: deleted ? '#888' : '#b9b9b9',
    padding: 5,
    borderRadius: 8
  }),
  filterIcon: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  projectsContainer: {
    paddingHorizontal: 10,
    flex: 1,
    height: '100%',
    backgroundColor: Colors.bg
  },
  projectItem: {
    backgroundColor: '#fff',
    width: '100%',
    marginVertical: 5,
    borderWidth: 1,
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