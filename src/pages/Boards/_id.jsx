// Board Details
import { useEffect, useState } from 'react'
import  Container  from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'

import { fetchBoardDetailsAPI } from '~/apis'

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

    return (
        <Container disableGutters maxWidth={false} sx={{ height:'100vh'}}>
          <AppBar/>
          <BoardBar board={mockData.board}/>
          <BoardContent board={mockData.board}/>
        </Container>
      )
}

export default Board
