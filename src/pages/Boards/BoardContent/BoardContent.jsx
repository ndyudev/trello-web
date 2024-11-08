import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, 
        // PointerSensor,
        useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

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

  // cùng 1 thời diều chỉ có 1 phần tử được kéo. ( column or card)
  const [activeDragItemId, setActiveDragItemID] = useState(null)

  const [activeDragItemType, setActiveDragItemType] = useState(null)

  const [activeDragItemData, setActiveDragItemData] = useState(null)


  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  // Tìm một cái columns theo cái cardId
  const findColumnByCardId = (cardId) => {
    // Đoạn này cần lưu ý nên dùng c.card thay vì c.cardOrderIds bởi vì ở bước handleDragOver chúng ta sẽ làm cho dự liệu cards hoàn chỉnh trước rồi mới tạo ra CardOrderIds mới.
    return orderedColumns.find(column => column?.cards?.map( card => card._id)?.includes(cardId))
  }


  const handleDragStart = (event) => {
        setActiveDragItemID(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD :
        ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)
        // console.log('handleDragStart:', event)
  }
  // Trigger trong qua trinh keo
  const handleDragOver = (event) => {
    // Khong lam gi them neu dang keo column
    if(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // console.log('handleDragEnd:', event)
    const { active, over } = event
    
    if(!active || !over) return
    // ActiveDraggingCard : là cái card đang được kéo
    const { id: activeDraggingCardId, data: {current: activeDraggingCardData }} = active
    // over card : là cái card đang tương tác trên hoặc dưới với cái card đang được kéo ở trên.
    const { id: OverCardId } = over
    // Tìm 2 cái columns theo theo CardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(OverCardId)
    // Nếu không tồn tại 1 trong 2 column thì không làm gì hết trách crash trang web
    if (!activeColumn || !overColumn) return
    // Xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau, còn nếu kéo card trong chính column ban đầu của nó thì không làm gì
    // Vì ở đây là xử lý logic lúc kéo ( handleDragOver ), còn xử lý lúc kéo xong xuôi thì nó lại là vấn đề khác ở ( handleDragEnd)
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        // Tìm vị trí Index của cái overCard trong column đích nơi mà activeCard sắp được thả
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === OverCardId)


        let newCardIndex 
        const isBelowOverItem =  active.rect.current.translated &&
            active.rect.current.translated.top >  over.rect.top + over.rect.height
          const modifier = isBelowOverItem ? 1 : 0

          newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
          // Clone mảng OrderedColumns
          const nextColumns = cloneDeep(prevColumns)
          const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
          const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
          // Columns cu
          if(nextActiveColumn) {
            // Xoa card ở cái column active ( cũng có thể hiểu là column cũ, cái lúc mà kéo card ra khỏi nó dể sang column khác)
            nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

            nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map( card => card._id)
          }
          // Column moi
          if (nextOverColumn) {
            //
            nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

            //
            nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

            nextOverColumn.cardOrderIds = nextOverColumn.cards.map( card => card._id)
          }
        return nextColumns
      })
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    // console.log('handleDragEnd:', event);
  
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      return;
    }
  
    if (!active || !over) return;
  
    // Kiểm tra nếu không có `over` (kéo ra ngoài vùng thả)
    if (!over) return;
  
    // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
    if (active.id !== over.id) {
      // Lấy vị trí cũ từ `active`
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id);
      // Lấy vị trí mới từ `over`
      const newIndex = orderedColumns.findIndex(c => c._id === over.id);
  
      // Sắp xếp lại mảng `orderedColumns`
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
  
      // Cập nhật lại state `orderedColumns` sau khi kéo thả
      setOrderedColumns(dndOrderedColumns);
    }
  
    setActiveDragItemID(null);
    setActiveDragItemData(null);
    setActiveDragItemType(null);
  };
  

  const customDropAnimation= {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd} 
      
      sensors={sensors}
    >
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          width: '100%',
          height: (theme) => theme.trello.BoardContentHeight,
          p: '10px 0',
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null }
          {( activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/> }
          {( activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/> }
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
