// Lits Columns
import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import {SortableContext, horizontalListSortingStrategy} from '@dnd-kit/sortable'

function ListColumns({ columns }) {
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
          backgroundColor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': { m : 2 }
        }}>
          {columns?.map(column => <Column key={column._id} column={column}/> )}

          {/** Box Add New Column CTA */}
          <Box sx={{
            minWidth:'200px',
            maxWidth:'200px',
            mx: 2,
            borderRadius:'6px',
            height: 'fit-content',
            backgroundColor: '#ffffff3d'
          }}>
            
            <Button startIcon={<NoteAddIcon/>}
            sx={{
              color:'white',
              width:'100%',
              justifyContent:'flex-start',
              pl: 2.5,
              py: 1,
            }}
            >
              Add New Column
            </Button>
          </Box>
        </Box>
    </SortableContext>
  )
}

export default ListColumns