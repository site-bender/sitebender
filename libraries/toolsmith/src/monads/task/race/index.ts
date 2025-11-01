import type { Task } from "../task/index.ts"

//++ Races multiple Tasks and returns the first to settle
export default function race<A>(tasks: Array<Task<A>>): Task<A> {
	return function runRace(): Promise<A> {
		//++ [EXCEPTION] .map() method permitted in Toolsmith for performance - provides task execution transformation
		const promises = tasks.map((task) => task())
		return Promise.race(promises)
	}
}
