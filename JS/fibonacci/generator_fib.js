const fibonacci = (to = 10) =>({
    *[Symbol.iterator]() {
        let prev =0, curr=1;
        while(prev<to){
            yield prev;
            [prev, curr]= [curr, prev+curr];
        }
    }
});


for(const e of fibonacci(1000)) {
    console.log(e);
}
