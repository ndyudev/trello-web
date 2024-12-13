// Board Details
import { useEffect, useState } from 'react'
import  Container  from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'

import { fetchBoardDetailsAPI, createNewCardAPI, createNewColumnAPI } from '~/apis'

function Board() {

    const [board, setBoard] = useState(null)

    useEffect(() => {
      // Tạm thời fix cứng boardId, flow chuẩn chỉnh về sau sử dụng react-router-dom để lấy chuẩn boardId từ URL về
      const boardId = '67553bd79d4306db5a61a043'
      // Call API
      fetchBoardDetailsAPI(boardId).then(board => {
        setBoard(board)
      })
    }, [])

    // Function này có nhiệm vụ gọi API tạo column và làm lại dữ liệu State Board
    const createNewColumn = async (newColumnData) => {
      const createdColumn = await createNewColumnAPI({
        ...newColumnData,
        boardId: board._id
      })
      console.log(createdColumn)
      // Cập nhập state board
    }

    // Function này có nhiệm vụ gọi API tạo Card và làm lại dữ liệu State Board
    const createNewCard = async (newCardData) => {
      const createdCard = await createNewCardAPI({
        ...newCardData,
        boardId: board._id
      })
      console.log(createdCard)
      // Cập nhập state board
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
