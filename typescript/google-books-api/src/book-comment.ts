import { idType } from "./book.js";
import { CommentsRepo } from "./repository.js";

export class BookComments{
   
    constructor(
        public id: idType,
        public comments: string[] = [],
    ){}

    public addComment(comment: string){
        this.comments.push(comment);
    }

    public async areCommentsExisting(){
        const comments: BookComments[] | undefined = await CommentsRepo.findAll();
        
        if (comments) {
            for(let i=0; i<comments.length; i++){
                
                if (comments[i].id === this.id) {
                    this.comments = comments[i].comments;
                    
                    return;
                }
            }  
        }
    }
}
