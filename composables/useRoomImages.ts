// composables/useRoomImages.ts
import { rooms as roomsData } from '~/data/rooms'

export const useRoomImages = async () => {
  const res = await $fetch<Record<string, string[]>>('/api/rooms/images')
  const rooms = roomsData.map(room => ({
    ...room,
    images: res[room.slug] || []
  }))
  return rooms
}
