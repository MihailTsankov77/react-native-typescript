import { idType } from "./shared-types.js";


export class PostCreateDto {
    constructor(
        public title: string, 
        public content: string, 
        public tags: string[], 
        public imageUrl: string, 
        public authorId: idType
        ) {}
}

export class Post extends PostCreateDto{
    
    constructor(
        public id: idType, 
        title: string, 
        content: string, 
        tags: string[], 
        imageUrl: string, 
        authorId: idType
        ) {
            super(title, content, tags, imageUrl, authorId);
        }
}