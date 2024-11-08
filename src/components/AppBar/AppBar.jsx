import { useState } from 'react'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Resents'
import Template from './Menus/Templates'
import Starred from './Menus/Starred'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profies'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'


function AppBar() {
  const [searchValue, setSearchvalue] = useState('')
  return (
    <Box sx={{
        width:'100%',
        height: (theme) => theme.trello.AppBarHeight,
        display:'flex',
        alignItems:'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX:'auto',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
      }}>
        <Box sx={{display:'flex', alignItems:'center', gap: 2}}>
          <AppsIcon sx={{ color:'white'}}/>
          <Box sx={{display:'flex', alignItems:'center', gap: 0.5}}>
            <SvgIcon component={TrelloIcon} fontSize="small" inheritViewBox sx={{ color: 'white'}}/>
            <Typography variant="span" sx={{ fontSize:'1.2rem', fontWeight:'bold', color:'white'}}
            >Trello</Typography>
          </Box>


          <Box sx ={{ display: { xs: 'none', md:'flex' }, gap: 1 }}>
            <Workspaces/>
            <Recent/>
            <Starred/>
            <Template/>
            <Button
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': { border: 'none'}
            }}
            variant="outlined" 
            startIcon={<LibraryAddIcon/>}
            >
              Create
            </Button>
          </Box>

        </Box>

        <Box sx={{display:'flex', alignItems:'center', gap: 2, color: 'white'}}>
          <TextField
          id="standard-search" 
          label="Search..." 
          type="text" 
          size="small"
          value={searchValue}
          onChange={(e) => setSearchvalue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color:'white' }}/>
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon 
              fontSize="small"
              sx={{ color: searchValue ? 'white': 'transparent', cursor: 'pointer'}}
              onClick={() => setSearchvalue('')}
              />
            )
          }}
          sx={{ 
            minWidth: '120px',
            maxWidth: '180px',
            '& label': { color:'white'},
            '& input': { color:'white'},
            '& label.Mui-focused': { color:'white'},
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' },
            }
          }}
        />
          <ModeSelect/>
          <Tooltip title="Notification">
            <Badge color="warning" variant="dot" sx={{cursor: 'pointer'}} >
              <NotificationsNoneIcon sx={{ color: 'white'}}/>
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <HelpOutlineIcon sx={{cursor: 'pointer',color: 'white'}}/>
          </Tooltip>
          <Profiles/>
        </Box>
        
      </Box>
  )
}
export default AppBar