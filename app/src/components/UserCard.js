import { View, Text, Image, Pressable, ActivityIndicator, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import AddUserIcon from '../../assets/icons/icon-add-user.svg'
import { colors } from '../theme/colors'
import { typography } from '../theme/typography'
import { imageUrl } from '../api/client'

export default function UserCard({ user, onConnect, pending }) {
  const requested = user.requested

  return (
    <View style={styles.card}>
      <View style={styles.connectsStrip}>
        <Feather name="link-2" size={14} color={colors.primaryDark} />
        <Text style={styles.connectsText}>{user.connectionsCount} Connects</Text>
      </View>

      <View style={styles.body}>
        <Image source={{ uri: imageUrl(user.profileImage) }} style={styles.avatar} />
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>
        <Text style={styles.occupation} numberOfLines={1}>
          {user.occupation}
        </Text>

        <Pressable
          style={[styles.button, requested && styles.buttonRequested]}
          onPress={() => onConnect(user._id)}
          disabled={requested || pending}
        >
          {pending ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <>
              {!requested && <AddUserIcon width={22} height={22} color={colors.white} />}
              <Text style={[styles.buttonText, requested && styles.buttonTextRequested]}>
                {requested ? 'Requested' : 'Connect'}
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 14,
  },
  connectsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.primaryLight,
    paddingVertical: 10,
  },
  connectsText: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  body: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: 14,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.background,
    resizeMode: 'cover',
  },
  name: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: 14,
  },
  occupation: {
    ...typography.body2,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: 14,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'stretch',
    height: 46,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  buttonRequested: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    ...typography.button,
    color: colors.white,
  },
  buttonTextRequested: {
    color: colors.textSecondary,
  },
})
