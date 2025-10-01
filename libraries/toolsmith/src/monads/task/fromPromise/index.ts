import type { Task } from "../task/index.ts"

//++ Lifts an existing Promise into a Task (thunk returning the Promise)
export default function fromPromise<A>(promise: Promise<A>): Task<A> {
	return function taskFromPromise(): Promise<A> {
		return promise
	}
}
