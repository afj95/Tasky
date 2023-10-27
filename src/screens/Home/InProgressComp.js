import React, { useState, useEffect } from 'react';
import Colors from '../../utils/Colors'
import { FilterModal, ProjectComponent } from "./components";
import { useDispatch, useSelector } from 'react-redux';
import { fetchInprogressProjects } from '../../redux/reducers/Projects/projects-actions';
import { navigate } from '../../navigation/RootNavigation';
import { AntDesign } from '@expo/vector-icons';
import {
     View,
     StyleSheet,
     FlatList,
} from "react-native";
import { showMessage } from '../../tools';
import { clearErrors } from '../../redux/reducers/Global/global-actions';
import { ActivityIndicator } from 'react-native-paper';
import { _listEmptyComponent } from '../../components/UI/_listEmptyComponent';

export const InProgressComp = ({ _onRefresh, page, setPage, ...props }) => {
     const dispatch = useDispatch()

     // active - finished
     const [status, setStatus] = useState('active');
     // deleted = true - deleted = false
     const [deleted, setDeleted] = useState(false);
     const [filterVisible, setVisible] = useState(false);
     const [loadMoreLoading, setLoadMore] = useState(false);

     const errors = useSelector((state) => state?.globalReducer?.errors)
     const loadings = useSelector((state) => state?.globalReducer?.loadings)

     const user = useSelector((state) => state?.authReducer?.user)
     const projects = useSelector(state => state?.projectsReducer?.inProgressProjects)
     const totalInprogress = useSelector(state => state?.projectsReducer?.totalInprogress)

     useEffect(() => {
          if (errors?.projects) {
               showMessage({
                    message: errors?.projects?.message + '',
                    type: 'danger',
               })
          }
          dispatch(clearErrors())
     }, [errors?.projects])

     const onProjectPressed = (item) => {
          navigate('ProjectDetailsScreen', {
               id: item.id,
               status,
               deleted,
               inProgress: true
          })
     }

     /*const _listHeaderComponent = () => {
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
     }*/

     const loadMore = async () => {
          let nextPage = page + 1;
          setLoadMore(true)
          await dispatch(fetchInprogressProjects({
               loadMore: true,
               page: nextPage,
               perPage: 5,
               refresh: true,
               in_progress: true
          }))
          setLoadMore(false)
          setPage(nextPage)
     }

     const _listFooterComponent = () => {
          return (
               <View style={styles.footerContainer}>
                    {totalInprogress <= projects?.length ?
                         <View />
                         : loadMoreLoading ?
                              <ActivityIndicator
                                   size={30}
                                   color={Colors.primary}
                              /> :
                              <>
                                   <AntDesign
                                        name={'pluscircleo'}
                                        size={30}
                                        color={Colors.primary}
                                        onPress={loadMore}
                                   />
                                   {/* <MyText>loadMore</MyText> */}
                              </>
                    }
               </View>
          )
     }

     const closeModal = () => setVisible(false)

     return (
          <View style={styles.container}>
               <View style={styles.projectsContainer}>
                    {loadings?.projects ? null :
                         <FlatList
                              contentContainerStyle={{ paddingBottom: projects?.length ? 30 : 0, flex: projects?.length ? 0 : 1 }}
                              style={{ flex: 1 }}
                              keyExtractor={(item, index) => '#' + index.toString()}
                              data={projects}
                              // ListHeaderComponent={user?.role === 'admin' ? _listHeaderComponent : null}
                              ListEmptyComponent={_listEmptyComponent}
                              ListFooterComponent={projects?.length ? _listFooterComponent : null}
                              showsVerticalScrollIndicator={false}
                              onRefresh={_onRefresh}
                              refreshing={false}
                              renderItem={ProjectComponent}
                         />}
                    {loadings?.projects ?
                         <View style={styles.loadingContainer}>
                              <ActivityIndicator color={Colors.primary} size={'small'} animating={loadings?.project} style={{ flex: 1 }} />
                         </View> : null
                    }
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
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: Colors.appWhite
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
     emptyImage: {
          width: '90%',
          height: '50%',
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
})