import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLE = {
  color: 'white',
  backgroundColor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white',
  },
  '&:hover': {
    backgroundColor: 'primary.50',
  },
}

function BoardBar({ board }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.BoardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        paddingX: 2,
        overflowX: 'auto',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label= { board?.title }
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button 
        variant="outlined" 
        startIcon={<PersonAddIcon/>}
        sx={{
          color:'white',
          borderColor: 'white',
          '&:hover': {borderColor: 'white'}
        }}
        >
          Invite
          </Button>
        <AvatarGroup 
          max={7} 
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border:'none',
              color:'white',
              cursor:'pointer',
              '&:first-of-type': { backgroundColor: '#a4b0be'},
            }
          }}
        >
          <Tooltip title="DyuDev">
            <Avatar 
            alt="DyuDev" 
            src="https://i.pinimg.com/564x/44/cf/8b/44cf8b5f7b7f6562b67784ef346aeca2.jpg"
          />
          </Tooltip>
          <Tooltip title="DyuDev">
            <Avatar 
            alt="DyuDev" 
            src="https://i.pinimg.com/564x/fc/c1/f8/fcc1f88238ceca005f428937c0930a4d.jpg"
          />
          </Tooltip>
          <Tooltip title="DyuDev">
            <Avatar 
            alt="DyuDev" 
            src="https://i.pinimg.com/564x/4b/22/57/4b22571e202097c0a14a53a686dc96b2.jpg"
          />
          </Tooltip>
          <Tooltip title="DyuDev">
            <Avatar 
            alt="DyuDev" 
            src="https://i.pinimg.com/736x/8b/b0/0f/8bb00f0bccc87c298057e8206ed71700.jpg"
          />
          </Tooltip>
          <Tooltip title="DyuDev">
            <Avatar 
            alt="DyuDev" 
            src="https://i.pinimg.com/564x/3f/6a/06/3f6a06d89bd4a4926273dcdaac920e48.jpg"
          />
          </Tooltip>
          <Tooltip title="DyuDev">
            <Avatar 
            alt="DyuDev" 
            src="https://i.pinimg.com/564x/8f/aa/fe/8faafea20155329b32141aa5fc2dd56e.jpg"
          />
          </Tooltip>
          <Tooltip title="DyuDev">
            <Avatar 
            alt="DyuDev" 
            src="https://i.pinimg.com/736x/e0/73/56/e0735658caf14e3cba7ee8d0c1a1bc61.jpg"
          />
          </Tooltip>
          <Tooltip title="DyuDev">
            <Avatar 
            alt="DyuDev" 
            src="https://i.pinimg.com/736x/40/e8/40/40e840809ec8613e619d869c83503c77.jpg"
          />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
