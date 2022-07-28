const fibonacci = (n = 10) =>({
    *[Symbol.iterator]() {
        let prev =0, curr=1;
        let index=0;
        while(index<n){
            yield prev;
            [prev, curr]= [curr, prev+curr];
            index++;
        }
    }
});


for(const e of fibonacci(17)) {
    console.log(e);
}
//generator_fib.js