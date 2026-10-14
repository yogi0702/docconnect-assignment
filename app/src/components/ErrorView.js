import { View, Text, Pressable, StyleSheet } from 'react-native'
import { colors } from '../theme/colors'
import { typography } from '../theme/typography'

export default function ErrorView({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>

      {onRetry && (
        <Pressable style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: colors.white,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  message: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    ...typography.button,
    color: colors.white,
  },
})
