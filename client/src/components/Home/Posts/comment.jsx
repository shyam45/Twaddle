import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import { userContext } from '../../../Pages/Home/Home'
import { client } from '../../../utils/axiosClient'
import './Posts.css'

const Comment = () => {
  const { fullName ,profile, _id} = useContext(userContext)
  const [data,setData] = useState([])
  useEffect(()=>{
    client.get('/post/comment/633d6b09b8c1cddb50f87386',data).then((response)=>{
      setData(response.data)
    },[])
  })
  const submitAction = (data) =>{
    client.put('/post/comment/633d6b09b8c1cddb50f87386',data).then(()=>{
    })
  }
  const replyAction = (data) =>{
    client.put('/post/replycomment/633d6b09b8c1cddb50f87386',data)
  }
  return <CommentSection
        currentUser={{
          currentUserId: _id,
          currentUserImg: profile,
          currentUserFullName: fullName
        }}
        commentData={data}
        onReplyAction={(data)=>{replyAction(data)}}
        onSubmitAction={(data)=>{submitAction(data)}}
      />
}

export default Comment
