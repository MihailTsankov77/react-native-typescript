import Answer from "./Answer";

export enum TypeAnswers{
    MultipleChoise,
    MultipleResponse,
    DaragAndDrop
}



interface QuestionInt{
    id: number | undefined;
    type: TypeAnswers;
    text: string;
    picture: string;
    points: number;
    answers: Answer[];
    position: number | undefined;
    created: string;
    modified: string;
}

export default class Question implements QuestionInt{
    constructor(
        public id: number | undefined,
        public type: TypeAnswers,
        public text: string,
        public picture: string,
        public points: number,
        public answers: Answer[],
        public position: number | undefined,
        public created: string,
        public modified: string,
    ){}
}