import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
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
