import React from 'react'
import { Box, Typography } from '@mui/material'
import './Story.css'
const Story = () => {
  return (
    <>
       <Box className='stories'>
            <Box className='story'>
                <Box className='storyBorder'>
                    <span><img className='span' src="https://imgs.search.brave.com/loxLMHzPFMRkXU9FB1oW4pkw_t9qb10xHQ4ufsV9eFU/rs:fit:860:692:1/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzUyLTUy/NjIzN19hdmF0YXIt/cHJvZmlsZS1oZC1w/bmctZG93bmxvYWQu/cG5n" alt="" /></span>
                    <Typography variant='caption'>
                        Your_story
                    </Typography>
                </Box>
            </Box>
        </Box> 
    </>
  )
}

export default Story