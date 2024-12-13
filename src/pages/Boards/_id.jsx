// Board Details
import { useEffect, useState } from 'react'
import  Container  from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
// import { mockData } from '~/apis/mock-data'

import { fetchBoardDetailsAPI, createNewCardAPI, createNewColumnAPI } from '~/apis'

function Board() {

    const [board, setBoard] = useState(null)

    useEffect(() => {
      // Tạm thời fix cứng boardId, flow chuẩn chỉnh về sau sử dụng react-router-dom để lấy chuẩn boardId từ URL về
      const boardId = '67553bd79d4306db5a61a043'
      // Call API
      fetchBoardDetailsAPI(boardId).then(board => {
        // Cần xử lý vấn đề kéo thả vào một column rỗng. 
        board.columns.forEach(column => {
          if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholderCard(column)]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
          }
        })
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

    return (
        <Container disableGutters maxWidth={false} sx={{ height:'100vh'}}>
          <AppBar/>
          <BoardBar board={board}/>
          <BoardContent 
            board={board}
            createNewColumn={createNewColumn}
            createNewCard={createNewCard}
          />
        </Container>
      )
}

export default Board
