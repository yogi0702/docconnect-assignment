import { useEffect, useState, useCallback } from 'react'
import { View, FlatList, Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PlusIcon from '../../assets/icons/icon-plus.svg'
import Logo from '../../assets/icons/logo-docconnect.svg'
import { colors } from '../theme/colors'
import { getPosts, getUser, CURRENT_USER_ID } from '../api/client'
import ProfileHeader from '../components/ProfileHeader'
import PostCard from '../components/PostCard'
import Loading from '../components/Loading'
import ErrorView from '../components/ErrorView'

export default function HomeScreen() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const [userData, postsData] = await Promise.all([getUser(CURRENT_USER_ID), getPosts()])
      setUser(userData)
      setPosts(postsData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Logo width={152} height={17} />
        <Pressable style={styles.addButton}>
          <PlusIcon width={24} height={24} color={colors.white} />
        </Pressable>
      </View>

      {loading && <Loading />}

      {!loading && error && <ErrorView message={error} onRetry={load} />}

      {!loading && !error && (
        <FlatList
          data={posts}
          keyExtractor={(post) => post._id}
          renderItem={({ item }) => <PostCard post={item} />}
          ListHeaderComponent={user ? <ProfileHeader user={user} /> : null}
          showsVerticalScrollIndicator={false}
          style={styles.list}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  addButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    backgroundColor: colors.background,
  },
})
