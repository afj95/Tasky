import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { showMessage } from 'react-native-flash-message';
// Components
import { Header } from "./components";
// redux & actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchingProjects, resetProjectsErrors } from '../../redux/reducers/Projects/projects-actions';
// fakeData
import { projects } from '../../fakeData/projects.json'

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  // const projects = useSelector(state => state?.projectsReducer?.projects)
  const fetchingProjectsLoading = useSelector(state => state?.projectsReducer?.fetchingProjectsLoading)
  const fetchingProjectsError = useSelector(state => state?.projectsReducer?.fetchingProjectsError)

  useEffect(() => {
    dispatch(resetProjectsErrors())
    dispatch(fetchingProjects())
  }, [])
  
  useEffect(() => {
    if(fetchingProjectsError) {
      showMessage({
        message: fetchingProjectsError.toString(),
        type: 'danger',
        duration: 3000
      })
    }
    dispatch(resetProjectsErrors())
  }, [fetchingProjectsError])
  
  const _onRefresh = () => {
    dispatch(resetProjectsErrors())
    dispatch(fetchingProjects())
  }

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity key={index} activeOpacity={0.5} style={styles.projectItem}>
        <Text>{item?.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <View style={styles.header}>
        <Header navigation={navigation} text={'projects'} />
      </View>
      <View style={styles.projectsContainer}>
        <FlatList
          keyExtractor={(item, index) => '#' + index.toString()}
          data={projects || []}
          // ListEmptyComponent={<EmptyComponent user={user} />}
          showsVerticalScrollIndicator={false}
          onRefresh={_onRefresh}
          refreshing={fetchingProjectsLoading}
          renderItem={_renderItem}
        />
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    width: '100%',
    zIndex: 1,
  },
  projectsContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  projectItem: {
    backgroundColor: '#fff',
    height: 50,
    width: '90%',
    marginVertical: 10,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 5,
    paddingHorizontal: 5,
    alignItems: 'center'
  }
});