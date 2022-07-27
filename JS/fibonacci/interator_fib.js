const   fibonacci = (to = 10) =>({
    [Symbol.iterator]() {
        let prev = -1, curr = 0;
        return {
            next() {
                [prev, curr] = (prev<0)? [0, 1] : [curr, curr+prev];
                return {
                    value:  prev,
                    done: prev>=to
                    
                }
            }
        }
    }
});


for(const e of fibonacci(1000)) {
    console.log(e);
}
