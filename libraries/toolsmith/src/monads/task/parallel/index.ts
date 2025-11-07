import type { Task } from "../task/index.ts"

//++ Runs multiple Tasks in parallel and collects all results
export default function parallel<A>(tasks: Array<Task<A>>): Task<Array<A>> {
	return function runParallel(): Promise<Array<A>> {
		//++ [EXCEPTION] .map() method permitted in Toolsmith for performance - provides task execution transformation
		const promises = tasks.map((task) => task())
		return Promise.all(promises)
	}
}
