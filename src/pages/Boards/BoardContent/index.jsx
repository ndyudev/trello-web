import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => `calc(100vh - (${theme.trello.AppBarHeight} + ${theme.trello.BoardBarHeight}))`,  
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Content
      </Box>
  )
}

export default BoardContent
