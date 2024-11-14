import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, 
        // PointerSensor,
        useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects, 
        closestCorners,
        // closestCenter,
        // rectIntersection,
        pointerWithin,
        getFirstCollision } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState, useCallback, useRef } from 'react'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
// import { Container } from '@mui/material'
// import { cardActionAreaClasses } from '@mui/material'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // Nếu dùng PointerSensor mặc định phải kết hợp thuộc tính CSS touch-action: none ở các phần tử kéo thả - Nhưng còn bug
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint:{ distance: 10}})
  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp click bị gọi event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint:{ distance: 10}})
  // Nhấn giữ 250ms và dung sai của cảm ứng (di chuyển chênh lệch 500px) thì mới kích hoạt event
  const toucherSensor = useSensor(TouchSensor, { activationConstraint:{ delay: 250, tolerance: 500}})
  // Ưu tiên sử dụng kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile tốt nhất không bị bug
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, toucherSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  // Cùng một thời điểm chỉ có một phần tử được kéo (column hoặc card)
  const [activeDragItemId, setActiveDragItemID] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)
  // Điểm va chạm cuối cùng ( Xử lý thuật tóán phát hiện va chạm)
  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Tìm một column theo cardId
  const findColumnByCardId = (cardId) => {
    // Dùng c.cards thay vì c.cardOrderIds vì trong handleDragOver dữ liệu cards sẽ hoàn chỉnh trước khi tạo CardOrderIds mới
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }
  // Function chung xử lý việc Cập nhập lại state trong trường hợp di chuyển Card giữa các Column khác nhau.
  const moveCardBetweenDifferentColumns = (
    overColumn,
    OverCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === OverCardId)
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
      // Clone mảng OrderredColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhập lại OrderedColumnsState mới
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      if (nextActiveColumn) {
        //Xóa card ở cái column active ( cũng có thể hiểu là column cũ, cái lúc mà kéo card ra khỏi nó để sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // Thêm PlaceHolder Card nếu Column rỗng : bị kéo hết card đi, không còn cái nào nữa.\
        if(isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        // Cập nhập lại mảng cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }
      // nexOverColumn: Column mới
      if (nextOverColumn) {
        // Kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa, chưa có thì cần xóa nó trước.
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        // phải cập nhập lại chuẩn lại dữ liệu columnId trong card sau khi kéo card giữa 2 column khác nhau.
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          column: nextOverColumn._id
        }
        // Tiếp theo là thêm cái card đang kéo vào overColumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

        // Xóa cái Placeholder Card đi nếu nó đang tồn tại 
        nextOverColumn.cards = nextOverColumn.cards.filter( card => !card.FE_PlaceholderCard)

        // Cập nhập lại mảng card đang kéo vào overColumn theo vị trí index mới
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      return nextColumns
    })
  }

  const handleDragStart = (event) => {
    setActiveDragItemID(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
    // console.log('handleDragStart:', event)

    // Nếu là kéo card thì mới thực hiện hành động như set giá trị oldColumn
    if(event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  // Trigger trong quá trình kéo
  const handleDragOver = (event) => {
    // Không làm gì nếu đang kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // console.log('handleDragOver:', event)

    const { active, over } = event
    if (!active || !over) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData }} = active
    const { id: OverCardId } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(OverCardId)

    // Nếu không tồn tại 1 trong 2 column thì không làm gì để tránh crash trang web
    if (!activeColumn || !overColumn) return

    // Xử lý logic khi kéo card giữa các columns khác nhau
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        OverCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!active || !over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData }} = active
      const { id: OverCardId } = over
  
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(OverCardId)

      // Nếu không tồn tại 1 trong 2 column thì không làm gì để tránh crash trang web
      if (!activeColumn || !overColumn) return
      //Keos card qua 2 column khasc nhau
      // Phải dung tới activeDragItemData ( set vào state từ bước handleDragStart ) chứ không phải acticeData
      // tong scope handleDragEnd này vì sau khi đi qua onDragOver tới đây là stats của card đã bị cập nhập một lần rồi.
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          OverCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        // hành động kéo thả card trong cùng 1 column

        // Lấy vị trí cũ ( từ thằng  oldColumnWhenDraggingCard)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        // Lấy vị trí mới ( từ thằng  )
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === OverCardId)
        // Dùng arrayMove vì kéo card trong một cái column thì tương tự với logic 
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {
          // Clone mảng OrderredColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhập lại OrderedColumnsState mới
          const nextColumns = cloneDeep(prevColumns)

          // Tìm tới column mà chúng ta đang thả.
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          // Cập nhập lại 2 giá trị mới là card và cardOrderIds trong cái targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          
          // Trả về vị trí state mới ( chuẩn vị trí )
          return nextColumns
        })
      }
    }
    // Xử lý kleos thả Columns trong cùng 1 một cái boardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        // Lấy vị trí cũ ( từ thằng active )
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
        // Lấy vị trí mới ( từ thằng over )
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
        // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Columns ban đầu
        // Code của arrayMove ở đây : Dnd - kit / ArrayMove.ts
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

        setOrderedColumns(dndOrderedColumns)
      }
    }
    // Những dữ liệu sau khi kéo thả này luôn phải đưa về giá trị null mặc định ban đầu
    setActiveDragItemID(null)
    setActiveDragItemData(null)
    setActiveDragItemType(null)
    setOldColumnWhenDraggingCard(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  // Sẽ custom lại chiến lược / thuật tóan phát hiện va chạm tối ưu cho việc kéo thả card giữa nhiều columns
  // args = arguments = Các đổi số và tham số
  const collisionDetectionStrategy = useCallback((args) => {
    // Trường hợp kéo column thì dùng thuật toán closestCorners là chuẩn nhất
    // console.log('collisionDetectionStrategy called')

    // Kiểm tra loại đối tượng đang kéo
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // console.log('Dragging column - using closestCorners')
      return closestCorners(args)
    }

    // Xác định các điểm va chạm bằng pointerWithin hoặc closestCorners
    const pointerIntersections = pointerWithin(args)
    // Nếu pointerIntersections là mảng rỗng, return luôn không làm gì hết.
    // Xử lý triệt để cái bù flickering của thư viện DndKit trong trường hợp sau:
    // - Kéo một card có img cover lớn và kéo lên phía trên cùng ra khỏi khu vực kéo thả
    if(!pointerIntersections?.length) return

    // console.log('Pointer intersections:', pointerIntersections)
    // Thuật tóan phát hiện va chạm sẽ trả về một mảng các va chạm ở đây (không cần bước này nữa)
    // const intersections = !!pointerIntersections?.length 
    //   ? pointerIntersections 
    //   : closestCorners(args)
    // console.log('Intersections:', intersections)

    // Lấy ID đầu tiên của phần tử va chạm
    let overId = getFirstCollision(pointerIntersections, 'id')
    // console.log('First collision overId:', overId)
    // Đoạn này để fix cái vụ flickering
    // Nếu cái over là column thì sẽ tìm tới cái cardId gần nhất trong khu vực va chạm đó dựa vào
    // thuật toán phát hiện va chạm closestCenter hoặc closestConrners đều được. Tuy nhiên ở đây dùng closestCorners mượt mà hơn
    const checkColumn = orderedColumns.find(column => column._id === overId)
    if(checkColumn) {
      overId = closestCorners({
        ...args,
        droppableContainers: args.droppableContainers.filter(container => {
          return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
        })
      })[0]?.id
    }
    // Nếu tìm thấy `overId`, cập nhật `lastOverId` và trả về
    if (overId) {
      lastOverId.current = overId
      // console.log('Updating lastOverId:', lastOverId.current)
      return [{ id: overId }]
    }

    // Nếu không có overId, trả về `lastOverId` hoặc mảng rỗng
    // console.log('No collision detected, returning lastOverId or empty array')
    return lastOverId.current ? [{ id: lastOverId.current }] : []
}, [activeDragItemType, orderedColumns])


  return (
    <DndContext
      // Thuật tóa phát hiện va chạm ( nếu không có nó thì card với cover lớn sẽ không kéo qua Column đựoc vì lúc này nó đang bị conflict giữa card và column)
      //  Chung ta sẽ dùng closetCorners thay vì closestCenter
      // collisionDetection={closestCorners}
      // Update video 37: nếu chỉ dùng closetsCorners sẽ có bug flickering + sai lệch dữ liệu 
      // Tự custom nâng cao thuật toán phát hiện va chạm 

      collisionDetection={collisionDetectionStrategy}


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
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} /> }
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} /> }
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
