import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, 
        // PointerSensor,
        useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

function BoardContent({ board }) {
  // Nếu dùng PointerSénor mặc định phải kết hợp thuộc tính CS touch-actions: non ở những phần tử kéo thả - Nhưng mà còn bug
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint:{ distance: 10}})
  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt evnet , fix trường hợp click bị gọi event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint:{ distance: 10}})
  // Nhấn giữu 250ms và dung sai của cảm ứng ( dễ hiểu là di chuyển/ chênh lệch 500px) thì mới kích hoạt event
  const toucherSensor = useSensor(TouchSensor, { activationConstraint:{ delay: 250, tolerance: 500}})
  // Ưu tien tiên sử dụng kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile tốt nhất không bị bug
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, toucherSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    const { active, over } = event

    // Kiểm tra nếu không có `over` (kéo ra ngoài vùng thả)
    if (!over) return

    // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
    if (active.id !== over.id) {
      // Lấy vị trí cũ từ `active`
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      // Lấy vị trí mới từ `over`
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      // Sắp xếp lại mảng `orderedColumns`
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)

      // Cập nhật lại state `orderedColumns` sau khi kéo thả
      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          width: '100%',
          height: (theme) => theme.trello.BoardContentHeight,
          p: '10px 0',
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
