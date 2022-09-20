
interface ImageInt{
    id: number | undefined;
    title: string;
    url: string;
    tags: string;
    description: string;
    author: string;
    // date: Date;
    isFav?: boolean;
}

export default class Image implements ImageInt{
    constructor(
        public id: number | undefined,
        public title: string,
        public url: string,
        public tags: string,
        public description: string,
        public author: string,
        public isFav = false,
    ){}
}