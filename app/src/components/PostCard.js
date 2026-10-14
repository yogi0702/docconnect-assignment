import { View, Text, Image, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from '../theme/colors'
import { typography } from '../theme/typography'
import { imageUrl } from '../api/client'

export default function PostCard({ post }) {
  return (
    <View style={styles.card}>
      <View style={styles.authorRow}>
        <Image source={{ uri: imageUrl(post.author.profileImage) }} style={styles.authorAvatar} />
        <View>
          <Text style={styles.authorName}>{post.author.name}</Text>
          <Text style={styles.authorRole}>{post.author.occupation}</Text>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.image && <Image source={{ uri: imageUrl(post.image) }} style={styles.image} />}

      <View style={styles.actions}>
        <View style={styles.action}>
          <Feather name="heart" size={22} color={colors.textPrimary} />
          <Text style={styles.actionCount}>{post.likes}</Text>
        </View>
        <View style={styles.action}>
          <Feather name="send" size={22} color={colors.textPrimary} />
          <Text style={styles.actionCount}>{post.shares}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    paddingTop: 14,
    marginBottom: 8,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
  },
  authorName: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  authorRole: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  content: {
    ...typography.body2,
    color: colors.textPrimary,
    lineHeight: 21,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
    resizeMode: 'cover',
    backgroundColor: colors.background,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionCount: {
    ...typography.body2,
    color: colors.textPrimary,
  },
})
