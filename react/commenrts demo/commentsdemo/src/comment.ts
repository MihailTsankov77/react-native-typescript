
export enum CommentStatus{
    Normal =1, Edited, Deleted
}

export class Comments{
    static nextId = 0;
    id = ++Comments.nextId;

    constructor(
        public title:string,
        public content: string, 
        public extend = true,
        public status = CommentStatus.Normal
    ){}
}