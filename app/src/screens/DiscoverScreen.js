import { useEffect, useState, useCallback } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { colors } from '../theme/colors'
import { typography } from '../theme/typography'
import { getUsers, sendConnect, CURRENT_USER_ID } from '../api/client'
import UserCard from '../components/UserCard'
import Loading from '../components/Loading'
import ErrorView from '../components/ErrorView'

export default function DiscoverScreen() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pendingId, setPendingId] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      setUsers(await getUsers(CURRENT_USER_ID))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function handleConnect(userId) {
    setPendingId(userId)

    try {
      await sendConnect(CURRENT_USER_ID, userId)
      setUsers((current) =>
        current.map((user) => (user._id === userId ? { ...user, requested: true } : user))
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setPendingId(null)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color={colors.textSecondary} />
        <Text style={styles.searchPlaceholder}>Search profiles, organizations...</Text>
      </View>

      <Text style={styles.sectionLabel}>People you may know</Text>

      {loading && <Loading />}

      {!loading && error && <ErrorView message={error} onRetry={load} />}

      {!loading && !error && (
        <FlatList
          data={users}
          keyExtractor={(user) => user._id}
          renderItem={({ item }) => (
            <UserCard user={item} onConnect={handleConnect} pending={pendingId === item._id} />
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 52,
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: colors.background,
  },
  searchPlaceholder: {
    ...typography.body1,
    color: colors.textSecondary,
  },
  sectionLabel: {
    ...typography.body1,
    color: colors.textSecondary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
  },
  list: {
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 14,
  },
  row: {
    gap: 14,
  },
})
