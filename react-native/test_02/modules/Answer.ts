
interface AnswerInt{
    id: number;
    text?: string;
    picture?: string;
    scorePr: number;
    created: string;
    modified: string;
}

export default class Answer implements AnswerInt{
    constructor(
     public id: number,
     public scorePr: number,
     public created: string,
     public modified: string,
     public text = "",
     public picture = "",
    ){}
}