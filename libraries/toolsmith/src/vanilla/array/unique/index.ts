import nub from "../nub/index.ts"

//++ Removes duplicate elements
const unique = nub

export default unique

//?? [EXAMPLE] `unique([1, 2, 2, 3, 1, 4]) // [1, 2, 3, 4]`
//?? [EXAMPLE] `unique(["a", "b", "a", "c"]) // ["a", "b", "c"]`
//?? [EXAMPLE] `unique([]) // []`
//?? [EXAMPLE] `unique([NaN, NaN, 0, -0]) // [NaN, 0]`
//?? [EXAMPLE] `unique([1, 2, 3, 2, 1, 4, 3]) // [1, 2, 3, 4]`
//?? [EXAMPLE] `unique(null) // []`
