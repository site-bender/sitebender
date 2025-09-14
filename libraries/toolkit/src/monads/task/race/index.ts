import type { Task } from "../task/index.ts"

//++ Races multiple Tasks and returns the first to settle
export default function race<A>(tasks: Array<Task<A>>): Task<A> {
	return function runRace(): Promise<A> {
		const promises = tasks.map((task) => task())
		return Promise.race(promises)
	}
}

//?? [EXAMPLE] race([() => Promise.resolve(1), () => Promise.resolve(2)])() // Promise<1 | 2>
/*??
 | [EXAMPLE]
 | const timeout = (ms: number): Task<never> => () =>
 |   new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms))
 | const fetchTask: Task<Response> = () => fetch("/api/data")
 | const fastest = race([fetchTask, timeout(5000)])
 | const result = await fastest()
 |
 | [PRO] Useful for timeouts and selecting fastest source
 | [GOTCHA] First rejection wins if it settles before resolutions
 |
*/
