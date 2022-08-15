
import { CommentListener } from './App'
import { Comments } from './comment'
import CommentItem from './CommentItem'
import './CommentList.css'

interface CommentsListProps{
  comments: Comments[]
  onExtend: CommentListener   
}

export default function CommentsList ({comments, ...rest}: CommentsListProps){
  
    return (
      <ul className='CommenstList'>
        {comments.map(comment=>(<CommentItem key={comment.id} comment={comment} {...rest} />))}
      </ul>
    )
  
}
