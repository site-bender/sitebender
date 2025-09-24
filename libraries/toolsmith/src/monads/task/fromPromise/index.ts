import type { Task } from "../task/index.ts"

//++ Lifts an existing Promise into a Task (thunk returning the Promise)
export default function fromPromise<A>(promise: Promise<A>): Task<A> {
	return function taskFromPromise(): Promise<A> {
		return promise
	}
}

//?? [EXAMPLE] fromPromise(fetch('/api').then(r => r.json())) // () => Promise<ResponseJSON>
/*??
 | [EXAMPLE]
 | const task = fromPromise(Promise.resolve(42))
 | const result = await task() // 42
 |
 | [PRO] Integrates non-Task async sources into Task pipelines
 | [GOTCHA] The wrapped Promise starts executing immediately when created
 |
*/
