
import { CommentListener } from './App'
import { Comments } from './comment'
import CommentItem from './CommentItem'

interface CommentsListProps{
  comments: Comments[]
  onExtend: CommentListener   
}

export default function CommentsList ({comments, ...rest}: CommentsListProps){
  
    return (
      <ul>
        {comments.map(comment=>(<CommentItem key={comment.id} comment={comment} {...rest} />))}
      </ul>
    )
  
}
