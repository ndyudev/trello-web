// Board Details
import { useEffect, useState } from 'react'
import  Container  from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mapOrder } from '~/utils/sorts'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

// import { mockData } from '~/apis/mock-data'

import { 
  fetchBoardDetailsAPI, 
  createNewCardAPI, 
  createNewColumnAPI, 
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import { Typography } from '@mui/material'

function Board() {

    const [board, setBoard] = useState(null)

    useEffect(() => {
      // Tạm thời fix cứng boardId, flow chuẩn chỉnh về sau sử dụng react-router-dom để lấy chuẩn boardId từ URL về
      const boardId = '675d3db1ef57727b5c0d7d85'
      // Call API
      fetchBoardDetailsAPI(boardId).then(board => {
        // Sắp xếp thứ tự columns luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con.
        board.column = mapOrder(board.column, board.columnOrderIds, '_id')

        // Cần xử lý vấn đề kéo thả vào một column rỗng. 
        board.columns.forEach(column => {
          // Khi F5 trang web thì cần xử lý vấn đề kéo thả vào column rỗng
          if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholderCard(column)]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
          } else {
            // Sắp xếp thứ tự các cards luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con.
            column.cardOrderIds = mapOrder(column.cards, column.cardOrderIds, '_id')
          }
        })
        console.log('full board:', board)
        
        setBoard(board)
      })
    }, [])

    // Function này có nhiệm vụ gọi API tạo column và làm lại dữ liệu State Board
    const createNewColumn = async (newColumnData) => {
      const createdColumn = await createNewColumnAPI({
        ...newColumnData,
        boardId: board._id
      })

      // Khi tạo column thì có card, cần xử lý vấn đề kéo thả column rỗng.
      createdColumn.cards = [generatePlaceholderCard(createdColumn)]
      createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
      
      // Cập nhập state board
      // Phía Front-End chúng ta phải tự làm đúng lại State data board ( thay vì phải gọi lại API  fetchBoardDetailSAPI)
      // Lưu ý : cách làm này phụ thuộc vào tùy lựa chọn và đặc thù dự án, có nơi thì BE sẽ hỗ trợ trả về luôn toàn bộ Board 
      // dù đây có là API tạo column hay card đi chăng nữa . => Lúc này FE sẽ nhàn hơn.
      const newBoard = { ...board }
      newBoard.columns.push(createdColumn)
      newBoard.columnOrderIds.push(createdColumn._id)
      setBoard(newBoard)
    }

    // Function này có nhiệm vụ gọi API tạo Card và làm lại dữ liệu State Board
    const createNewCard = async (newCardData) => {
      const createdCard = await createNewCardAPI({
        ...newCardData,
        boardId: board._id
      })
      console.log(createdCard)
      // Cập nhập state board
      // Phía Front-End chúng ta phải tự làm đúng lại State data board ( thay vì phải gọi lại API  fetchBoardDetailSAPI)
      // Lưu ý : cách làm này phụ thuộc vào tùy lựa chọn và đặc thù dự án, có nơi thì BE sẽ hỗ trợ trả về luôn toàn bộ Board 
      // dù đây có là API tạo column hay card đi chăng nữa . => Lúc này FE sẽ nhàn hơn.
      const newBoard = { ...board }
      const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
      if (columnToUpdate) {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
      setBoard(newBoard)
    }
    // Func này có nhiệm vụ gọi API và xử lý khi kéo thả Column xong xui
    const moveColumns = (dndOrderedColumns) => {
      // Cập nhập lại cho chuẩn dữ liệu State Board
      const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

      const newBoard = { ...board }
      newBoard.columns = dndOrderedColumns
      newBoard.columnOrderIds = dndOrderedColumnsIds
      setBoard(newBoard)

      // Gọi API Update Board
      updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
    }

    /**
     * Khi duy chuyển card trong cùng một column:
     * Chỉ cần gọi API cập nhập mảng cardOrderIds của Column chứa nó ( thay đổi vị trí trong mảng cardOrderIds )
     */
    const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
      // Update chuẩn dữ liệu State Board
      const newBoard = { ...board }
      const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
      if (columnToUpdate) {
        columnToUpdate.cards = dndOrderedCards
        columnToUpdate.cardOrderIds = dndOrderedCardIds
      }
      setBoard(newBoard)

      // Gọi API cập nhật cardOrderIds của Column
      updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
    }

    if(!board) {
      return (
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          width: '100vw',
          height: '100vh',
          justifyContent: 'center'
        }}>
          <CircularProgress/>
          <Typography>Loading Board...</Typography>
        </Box>
      )
    }

    return (
        <Container disableGutters maxWidth={false} sx={{ height:'100vh'}}>
          <AppBar/>
          <BoardBar board={board}/>
          <BoardContent 
            board={board}
            createNewColumn={createNewColumn}
            createNewCard={createNewCard}
            moveColumns={moveColumns}
            moveCardInTheSameColumn={moveCardInTheSameColumn}
          />
        </Container>
      )
}

export default Board
