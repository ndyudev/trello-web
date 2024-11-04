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
import ListCard from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { height } from '@mui/system'
import { Opacity } from '@mui/icons-material'

function Column({column}) {

    const {  attributes, listeners, setNodeRef, transform,  transition, isDragging } = useSortable({
        id: column._id, 
        data: {...column }
    })
      
    const dndKitColumnStyles = {
        // touchAction: 'none',  // Dành cho sensor default dạng PointerSensor
        transform: CSS.Translate.toString(transform),
        transition,
        // Chiều cao luôn phải max 100% vì nếu không sẽ lỗi lúc kéo column ngăn qua một cái column dài thì phải kéo ở khu vực giữa rất khó chịu
        height: '100%',
        opacity: isDragging? 0.5 : undefined
    }

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {setAnchorEl(event.currentTarget)}
    const handleClose = () => {setAnchorEl(null)}
    const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
    // Phải bọc lại div ở đây vì vấn dề chiều cao của column khi kéo thả.
  return (
    <div ref={setNodeRef}  style={ dndKitColumnStyles }  {...attributes}>
        <Box 
            {...listeners}
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
            {/** Box Column Header */}
            <Box
            sx={{
                height: (theme) => theme.trello.columnHeaderHeight,
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
                {column?.title}
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
            <ListCard cards={orderedCards}/>
            {/** Box Column Footer */}
            <Box
            sx={{
                height:  (theme) => theme.trello.columnFooterHeight,
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
    </div>
  )
}

export default Column