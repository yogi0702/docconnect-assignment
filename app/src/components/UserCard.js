import { View, Text, Image, Pressable, ActivityIndicator, StyleSheet } from 'react-native'
import ConnectsIcon from '../../assets/icons/icon-connects.svg'
import AddUserIcon from '../../assets/icons/icon-add-user.svg'
import SendIcon from '../../assets/icons/icon-send-outline.svg'
import { colors } from '../theme/colors'
import { typography } from '../theme/typography'
import { imageUrl } from '../api/client'

export default function UserCard({ user, onConnect, pending }) {
  const requested = user.requested

  return (
    <View style={styles.card}>
      <View style={styles.connectsStrip}>
        <ConnectsIcon width={24} height={24} color={colors.primaryDark} />
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
            <ActivityIndicator size="small" color={requested ? colors.textSecondary : colors.white} />
          ) : (
            <>
              {requested ? (
                <SendIcon width={24} height={24} color={colors.textSecondary} />
              ) : (
                <AddUserIcon width={15} height={14} color={colors.white} />
              )}
              <Text style={[styles.buttonText, requested && styles.buttonTextRequested]}>
                {requested ? 'Message' : 'Connect'}
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
    marginBottom: 16,
  },
  connectsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    backgroundColor: colors.primaryLight,
    paddingVertical: 4,
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
    height: 32,
    borderRadius: 8,
    paddingHorizontal: 8,
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
    lineHeight: 16,
  },
  buttonTextRequested: {
    color: colors.textSecondary,
  },
})
