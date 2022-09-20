

export enum TodoStatus{
    Active =1, Completed, Canceled
}
export class Todo{
    

    constructor(
        public text: string,
        public deadline = new Date().toISOString(),
        public id: number | undefined,
        public status = TodoStatus.Active
    ){}

}