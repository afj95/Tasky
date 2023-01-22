import React, { useState, useEffect } from 'react';
import { FilterModal, Header } from "./components";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../redux/reducers/Projects/projects-actions';
import MyText from '../../components/UI/MyText';
import { navigate } from '../../navigation/RootNavigation';
import Colors from '../../utils/Colors';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import { showMessage } from '../../tools';
import { clearErrors } from '../../redux/reducers/Global/global-actions';
import { ActivityIndicator } from 'react-native-paper';

export const HomeScreen = () => {
  const dispatch = useDispatch()

  // active - finished
  const [status, setStatus] = useState('active');
  // deleted = true - deleted = false
  const [deleted, setDeleted] = useState(false);
  const [filterVisible, setVisible] = useState(false);
  const [loadMoreLoading, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);

  const errors = useSelector((state) => state?.globalReducer?.errors)
  const loadings = useSelector((state) => state?.globalReducer?.loadings)

  const user = useSelector((state) => state?.authReducer?.user)
  const projects = useSelector(state => state?.projectsReducer?.projects)
  const totalProjects = useSelector(state => state?.projectsReducer?.totalProjects)

  useEffect(() => {
    if (errors?.projects) {
      showMessage({
        message: errors?.projects?.message + '',
        type: 'danger',
      })
    }
    dispatch(clearErrors())
  }, [errors?.projects])

  useEffect(() => {
    dispatch(fetchProjects(status, deleted, false, page, 5))
  }, [status, deleted])

  const _onRefresh = () => {
    setPage(1)
    dispatch(fetchProjects(status, deleted, false, 1, 5))
  }

  const onProjectPressed = (item) => {
    navigate('ProjectDetailsScreen', {
      id: item.id,
      status,
      deleted
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
          <MyText style={styles.projectName} text={item?.name} />
          <MyText style={styles.projectDescription} numberOfLines={2} text={item?.description} />
        </View>
        {/* <View style={styles.tasksContainer}>
          <FontAwesome5 name={'tasks'} color={Colors.primary} />
          <MyText text={item?.tasks?.length} />
        </View> */}
        {item?.deleted_at ? <View style={styles.deletedIcon} /> : null}
        {item?.status === 'finished' ? <View style={styles.finishedIcon} /> : null}
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
        {loadings?.projects ? <ActivityIndicator size={15} color={Colors.primary} /> : null}
      </View>
    )
  }

  const _listEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image source={require('../../../assets/images/no_data.gif')} style={styles.emptyImage} />
        <MyText style={styles.emptyText}>noData</MyText>
      </View>
    )
  }

  const loadMore = async () => {
    let nextPage = page + 1;
    setLoadMore(true)
    await dispatch(fetchProjects(status, deleted, true, nextPage, 5))
    setLoadMore(false)
    setPage(nextPage)
  }

  const _listFooterComponent = () => {
    return (
      <View style={styles.footerContainer}>
        {totalProjects <= projects?.length ?
          <MyText>reachedEnd</MyText>
          : loadMoreLoading ?
            <ActivityIndicator
              size={'small'}
              color={Colors.primary}
            /> :
            <>
              <AntDesign
                name={'pluscircleo'}
                size={30}
                color={Colors.primary}
                onPress={loadMore}
              />
              <MyText>loadMore</MyText>
            </>}
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
          contentContainerStyle={{ paddingBottom: projects?.length ? 50 : 0, flex: projects?.length ? 0 : 1 }}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => '#' + index.toString()}
          data={projects}
          ListHeaderComponent={user?.role === 'admin' ? _listHeaderComponent : null}
          ListEmptyComponent={_listEmptyComponent}
          ListFooterComponent={projects?.length ? _listFooterComponent : null}
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
  footerContainer: {
    height: 50,
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
    paddingHorizontal: 5,
  },
  projectName: {
    fontFamily: 'bold',
    fontSize: 16
  },
  projectDescription: {
    fontFamily: 'light',
    fontSize: 15,
    marginEnd: 35
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
});