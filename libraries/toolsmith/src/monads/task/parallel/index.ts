import type { Task } from "../task/index.ts"

//++ Runs multiple Tasks in parallel and collects all results
export default function parallel<A>(tasks: Array<Task<A>>): Task<Array<A>> {
	return function runParallel(): Promise<Array<A>> {
		const promises = tasks.map((task) => task())
		return Promise.all(promises)
	}
}

//?? [EXAMPLE] parallel([() => Promise.resolve(1), () => Promise.resolve(2)])() // Promise<[1, 2]>
/*??
 | [EXAMPLE]
 | const t1: Task<number> = () => Promise.resolve(1)
 | const t2: Task<number> = () => Promise.resolve(2)
 | const both = parallel([t1, t2])
 | const result = await both() // [1, 2]
 |
 | [PRO] Executes tasks concurrently for better throughput
 | [GOTCHA] If any task rejects, the whole Promise.all rejects
 |
*/
