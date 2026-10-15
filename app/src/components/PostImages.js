import { useState } from 'react'
import { View, Text, Image, FlatList, useWindowDimensions, StyleSheet } from 'react-native'
import ArrowIcon from '../../assets/icons/icon-arrow-right.svg'
import { colors } from '../theme/colors'
import { typography } from '../theme/typography'
import { imageUrl } from '../api/client'

// One image renders plain. Several render as a paging carousel with a 1/N
// badge and a next arrow, as the design shows on the second post.
export default function PostImages({ images }) {
  const { width } = useWindowDimensions()
  const [index, setIndex] = useState(0)

  if (!images?.length) return null

  if (images.length === 1) {
    return <Image source={{ uri: imageUrl(images[0]) }} style={[styles.image, { width }]} />
  }

  return (
    <View>
      <FlatList
        data={images}
        keyExtractor={(path, i) => `${path}-${i}`}
        renderItem={({ item }) => (
          <Image source={{ uri: imageUrl(item) }} style={[styles.image, { width }]} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) =>
          setIndex(Math.round(event.nativeEvent.contentOffset.x / width))
        }
      />

      <View style={styles.counter}>
        <Text style={styles.counterText}>
          {index + 1}/{images.length}
        </Text>
      </View>

      {index < images.length - 1 && (
        <View style={styles.next}>
          <ArrowIcon width={22} height={22} color={colors.white} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 3 / 4,
    resizeMode: 'cover',
    backgroundColor: colors.background,
  },
  counter: {
    position: 'absolute',
    top: 14,
    left: 14,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: 'rgba(20,24,32,0.65)',
  },
  counterText: {
    ...typography.body2,
    color: colors.white,
  },
  next: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(20,24,32,0.65)',
  },
})
