import { NumberIdGenerator, RepositoryInMemory, RepositoryInt } from "./repository.js";
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

export interface PostRepositoryInt extends RepositoryInt<idType, Post>{
    findByTags(searchTags: string[]): Post[];
    findByTitlePart(titlePart: string): Post[];
    findByAuthorId(authorId: idType): Post[];
}

export class PostRepository extends RepositoryInMemory<idType, Post> implements PostRepositoryInt{
    findByTags(searchTags: string[]): Post[] {
       return this.findAll().filter(post => post.tags.some(tag => searchTags.includes(tag)));
    }
    findByTitlePart(titlePart: string): Post[] {
        return this.findAll().filter(post => post.title.includes(titlePart));
    }
    findByAuthorId(authorId: number): Post[] {
        return this.findAll().filter(post => post.authorId===authorId)
    }
    
}


// const SAMPLE_POSTS = [
//     new Post(0, "New in TypeScript", "TypeScript became strictier", ['cool', 'new', 'strict'], "",1),
//     new Post(0, "New in ", "TypeScript became strictier", ['cool', 'new', 'strict'], "",1),
//     new Post(0, "New in GOdMOD", "TypeScript became strictier", ['god', 'strict'], "",1),
//     new Post(0, "coffee New in ", "TypeScript became strictier", ['cool', 'new', 'coffee'], "",2),
//     new Post(0, "TypeScript", "Dont show", ['cool'], "",1),
// ]


// function testPostRepository(){
//     const postRepo: PostRepositoryInt = new PostRepository(new NumberIdGenerator());
//         SAMPLE_POSTS.forEach(post => postRepo.create(post));
//         console.log("###")
//         postRepo.findAll().forEach(post => console.log(post));
//         console.log("###")
//         postRepo.findByAuthorId(1).forEach(post => console.log(post));
//         console.log("###")
//         postRepo.findByTags([`new`, `god`]).forEach(post => console.log(post));
        
//         console.log("###")
//         postRepo.findByTitlePart("New in").forEach(post => console.log(post));
    
// }

// testPostRepository();