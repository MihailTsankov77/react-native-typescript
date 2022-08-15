
import { CommentListener } from "./App";
import { Comments, CommentStatus } from "./comment";
import './CommentItem.css'

interface CommentItemProps {
  comment: Comments;
  onExtend: CommentListener
}
 
const CommentItem = ({comment, onExtend}: CommentItemProps) => {
  function handleExpandContent(){
    onExtend({...comment, extend: !comment.extend})
  }
  return ( <div className="comment-item">
            <span className="comment-left">
              <span>
              <span className="comment-id">{comment.id}.</span>
              <span className="comment-title">{comment.title}</span>
              </span>
              <span>{comment.extend? comment.content: ""} </span>
            </span>
            <span className="comment-rigth">
              <span className="comment-status">{comment.status===CommentStatus.Normal?
                                                "" : CommentStatus[comment.status]}</span>
              <span>
              {comment.status===CommentStatus.Normal?
               <span className="TodoItem-buttons">
               <span className="TodoItem-button fas fa-check-circle" onClick={handleExpandContent}
              ></span>
               <span className="TodoItem-button cancel fas fa-times-circle"
               ></span> 
              </span>
              :
              <span className="TodoItem-button danger fas fa-times-circle"></span>
              } 
          
            </span>
              </span>
          </div> );
}
 
export default CommentItem;