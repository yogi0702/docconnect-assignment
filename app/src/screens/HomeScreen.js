import { useEffect, useState, useCallback } from 'react'
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { colors } from '../theme/colors'
import { typography } from '../theme/typography'
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
        <Text style={styles.logo}>
          Doc<Text style={styles.logoAccent}>Connect</Text>
        </Text>
        <Pressable style={styles.addButton}>
          <Feather name="plus" size={22} color={colors.white} />
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
  logo: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  logoAccent: {
    color: colors.primary,
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
