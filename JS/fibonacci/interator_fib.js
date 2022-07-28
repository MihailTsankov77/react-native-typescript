const   fibonacci = (n = 10) =>({
    [Symbol.iterator]() {
        let prev = -1, curr = 0;
        let index=-1;
        return {
            next() {
                [prev, curr] = (prev<0)? [0, 1] : [curr, curr+prev];
                index++;
                return {
                    value:  prev,
                    done: index>=n
                    
                }
            }
        }
    }
});


for(const e of fibonacci(5)) {
    console.log(e);
}
