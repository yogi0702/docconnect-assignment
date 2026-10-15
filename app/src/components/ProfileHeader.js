import { View, Text, Image, StyleSheet } from 'react-native'
import ConnectsIcon from '../../assets/icons/icon-connects.svg'
import { colors } from '../theme/colors'
import { typography } from '../theme/typography'
import { imageUrl } from '../api/client'

export default function ProfileHeader({ user }) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrap}>
        <Image source={{ uri: imageUrl(user.profileImage) }} style={styles.avatar} />
      </View>

      <View style={styles.connectsPill}>
        <ConnectsIcon width={24} height={24} color={colors.primaryDark} />
        <Text style={styles.connectsText}>{user.connectionsCount} Connects</Text>
      </View>

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.occupation}>{user.occupation}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 28,
    backgroundColor: colors.background,
  },
  avatarWrap: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: 128,
    height: 128,
    resizeMode: 'cover',
  },
  connectsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.primaryLight,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.primaryDarkFaint,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 16,
  },
  connectsText: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  name: {
    ...typography.h1,
    color: colors.textPrimary,
    marginTop: 12,
  },
  occupation: {
    ...typography.body1,
    color: colors.textSecondary,
    marginTop: 2,
  },
})
