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
// import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
// import { height } from '@mui/system'
// import { Opacity } from '@mui/icons-material'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
// import theme from '~/theme'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'


function Column({ column, createNewCard, deleteColumnDetails }) {

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

    // Card đã sắp xếp ở component cha cao nhất
    const orderedCards = column.cards

    const [openNewCardForm, setOpenNewCardForm] = useState(false)
    const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

    const [newCardTitle, setNewCardTitle] = useState('')

    const addNewCard = () => {
        if(!newCardTitle) {
        toast.error("Please Enter Card Title !", { position: 'bottom-right'})
        return
        }
        toast.log(newCardTitle,  position="top-right", theme="colored" )
        // Tạo dữ liệu Card để gọi API
        /**
         *  Gọi lên props function createNewColumn nằm ở component cha cao nhat (boards/_id.jsx)
         * Lúc này có thể gọi luôn API ở đây xong thay vì phải lần lượt gọi ngược lên những component cha phía bên trên. 
         * ( Đối với component con nằm càng sâu thì càng khổ :D)
         * - Việc sử dụng Redux như vậy thì code sẽ Clean chuẩn chỉnh hơn rất nhiều.
         */
        const newCardData = {
            title: newCardTitle,
            columnId: column._id
        }
        createNewCard(newCardData)
        

        // Đóng lại trạng thái thêm Card mới & Clear input
        toggleOpenNewCardForm()
        setNewCardTitle('')
    }
    // xử lý xóa một column và cards bên trong nó
    const confirmDeleteColumn = useConfirm()
    const handleDeleteColumn = () => {
        confirmDeleteColumn({
            title: 'Delete Column?',
            description: 'This action will permamently delete your Column and its Cards! Are you sure?',
            confirmationText: 'Cofirm',
            cancellationText: 'Cancel',
            // buttonOrder: ['confirm', 'cancel']
            // allowClose: false,
            // dialogProps: { maxWidth: 'lg'},
            // confirmationButtonProps: { color: 'success', variant: 'outlined' },
            // cancellationButtonProps: { color: 'primary' },
            // confirmationKeyword: 'ndyudev'
            // content: ''
        }).then(() => {
        /**
         *  Gọi lên props function deleteColumnDetails nằm ở component cha cao nhat (boards/_id.jsx)
         * Lúc này có thể gọi luôn API ở đây xong thay vì phải lần lượt gọi ngược lên những component cha phía bên trên. 
         * ( Đối với component con nằm càng sâu thì càng khổ :D)
         * - Việc sử dụng Redux như vậy thì code sẽ Clean chuẩn chỉnh hơn rất nhiều.
         */
        deleteColumnDetails(column._id)
        }).catch(() => {})
    }
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
                onClick={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-column-dropdown',
                }}
                >
                <MenuItem onClick={toggleOpenNewCardForm}  sx={{
                    '&:hover': { color: 'success.light',  '& .add-card-icon': { color: 'success.light' } } } } >
                    <ListItemIcon><AddCardIcon className= "add-card-icon" fontSize="small" /></ListItemIcon>
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
                <MenuItem onClick={handleDeleteColumn} sx={{
                    '&:hover': { color: 'warning.dark',  '& .delete-forever-icon': { color: 'warning.dark' } } } } >
                    <ListItemIcon><DeleteForeverIcon className="delete-forever-icon" fontSize='small' ></DeleteForeverIcon></ListItemIcon>
                    <ListItemText>Delete this column</ListItemText>
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
                // display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'space-between',
            }}>
            {!openNewCardForm
                ?<Box sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Button startIcon={< AddCardIcon />} onClick={toggleOpenNewCardForm}>Add new card</Button>
                    <Tooltip title="Drag to move">
                        <DragHandleIcon sx={{cursor:'pointer'}}/>
                    </Tooltip>
                </Box>
                : <Box sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                    <TextField
                    label="Enter card title..." 
                    type="text" 
                    size="small"
                    variant='outlined'
                    autoFocus
                    data-no-dnd = "true"
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                    sx={{
                        '& label': { color:'text.primary'},
                        '& input': { 
                            color: (theme) => theme.palette.primary.main,
                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                        },
                        '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                        '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: (theme) => theme.palette.primary.main },
                        '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
                        '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary.main },
                        },
                        '& .MuiOutlineInput-input': {
                            borderRadius: 1
                        }
                    }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                        data-no-dnd = "true"
                        onClick={addNewCard}
                        variant= "contained" color= "success" size= "small"
                        sx={{
                        boxShadow: 'none',
                        border: '0.5px solid',
                        borderColor: (theme) => theme.palette.success.main,
                        '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                        }}
                    >Add</Button>
                    <CloseIcon
                        data-no-dnd = "true"
                        fontSize="small"
                        sx= {{ 
                            color: (theme) => theme.palette.warning.light, 
                            cursor: 'pointer'
                        }}
                        onClick={toggleOpenNewCardForm}
                        />
                    </Box>
                </Box>
            }
            </Box>
        </Box>
    </div>
  )
}

export default Column