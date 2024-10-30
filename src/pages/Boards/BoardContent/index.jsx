import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import Tooltip from '@mui/material/Tooltip'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import theme from '~/theme'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {setAnchorEl(event.currentTarget)}
  const handleClose = () => {setAnchorEl(null)}

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        width: '100%',
        height: (theme) => theme.trello.BoardContentHeight,
        p: '10px 0',
      }}>
        <Box sx={{
          backgroundColor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': { m : 2 }
        }}>
                {/** Box Column */}

      <Box
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
          ml: 2,
          borderRadius: '6px',
          height:'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.BoardContentHeight} - ${theme.spacing(5)})`
        }}>
            { /** Box Column */}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor:'pointer',
            }}>
              Column Title
              </Typography>
            <Box>
              <Tooltip title="More Options">
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor: 'pointer' }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                id="basic-column-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                  <ListItemText>Paster</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><DeleteForeverIcon></DeleteForeverIcon></ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
                
              </Menu>
            </Box>
          </Box>
          {/**  Box List Card*/}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display:'flex',
            flexDirection:'column',
            gap:1,
            overflowX: 'hidden',
            overflowy: 'auto',
            maxHeight: (theme) => `calc(
              ${theme.trello.BoardContentHeight} - 
              ${theme.spacing(5)} -
              ${COLUMN_HEADER_HEIGHT} -
              ${COLUMN_FOOTER_HEIGHT}
              )`,
              '&::-webkit-scrollbar-thumb': {backgroundColor: '#ced0da',},
              '&::-webkit-scrollbar-thumb:hover': {backgroundColor: '#bfc2cf'}
          }}>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardMedia 
                  sx={{ height: 140 }}
                  image="https://i.pinimg.com/564x/6a/d0/dc/6ad0dc6e68dcdd5b6427d78ec33a8f80.jpg"
                  title="green iguana"
                />
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>nDyuDev MERN STACK</Typography>
                </CardContent>
                <CardActions sx={{ p: '0 4px 8px 4px '}}>
                  <Button size="small" startIcon={ <GroupIcon/> }>20</Button>
                  <Button size="small" startIcon={ <CommentIcon/>}>15</Button>
                  <Button size="small" startIcon={ <AttachmentIcon/> }>10</Button>
                </CardActions>
              </Card>

              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }} >
                <Typography>Card 01</Typography>
                </CardContent>
              </Card>


              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }} >
                <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }} >
                <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }} >
                <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }} >
                <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }} >
                <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }} >
                <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }} >
                <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }} >
                <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }} >
                <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }} >
                <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }} >
                <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }} >
                <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }} >
                <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }} >
                <Typography>Card 01</Typography>
                </CardContent>
              </Card>
            </Box>
            {/** Box Column Footer */}
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Button startIcon={<AddCardIcon/>}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{cursor:'pointer'}}/>
            </Tooltip>
          </Box>
        </Box>

        {/** Box Column 02 */}

      <Box
          sx={{
            minWidth: '300px',
            maxWidth: '300px',
            backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
            ml: 2,
            borderRadius: '6px',
            height:'fit-content',
            maxHeight: (theme) => `calc(${theme.trello.BoardContentHeight} - ${theme.spacing(5)})`
          }}>
            { /** Box Column */}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor:'pointer',
            }}>
              Column Title
              </Typography>
            <Box>
              <Tooltip title="More Options">
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor: 'pointer' }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                id="basic-column-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                  <ListItemText>Paster</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><DeleteForeverIcon></DeleteForeverIcon></ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
                
              </Menu>
            </Box>
          </Box>
          {/**  Box List Card*/}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display:'flex',
            flexDirection:'column',
            gap:1,
            overflowX: 'hidden',
            overflowy: 'auto',
            maxHeight: (theme) => `calc(
              ${theme.trello.BoardContentHeight} - 
              ${theme.spacing(5)} -
              ${COLUMN_HEADER_HEIGHT} -
              ${COLUMN_FOOTER_HEIGHT}
              )`,
              '&::-webkit-scrollbar-thumb': {backgroundColor: '#ced0da',},
              '&::-webkit-scrollbar-thumb:hover': {backgroundColor: '#bfc2cf'}
          }}>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardMedia 
                  sx={{ height: 140 }}
                  image="https://i.pinimg.com/564x/6a/d0/dc/6ad0dc6e68dcdd5b6427d78ec33a8f80.jpg"
                  title="green iguana"
                />
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>nDyuDev MERN STACK</Typography>
                </CardContent>
                <CardActions sx={{ p: '0 4px 8px 4px '}}>
                  <Button size="small" startIcon={ <GroupIcon/> }>20</Button>
                  <Button size="small" startIcon={ <CommentIcon/>}>15</Button>
                  <Button size="small" startIcon={ <AttachmentIcon/> }>10</Button>
                </CardActions>
              </Card>

              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
              }}>
                <CardContent sx={{ padding: 1.5, '&:last-child': { p: 1.5 } }} >
                <Typography>Card 01</Typography>
                </CardContent>
              </Card>

            </Box>
            {/** Box Column Footer */}
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Button startIcon={<AddCardIcon/>}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{cursor:'pointer'}}/>
            </Tooltip>
          </Box>
        </Box>

        </Box>
    </Box>
  )
}

export default BoardContent
