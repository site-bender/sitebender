import doNotation from "../doNotation/index.ts"
import type { MonadDictionary } from "../doNotation/index.ts"

type Task<A> = () => Promise<A>

const TaskMonad: MonadDictionary<Task<any>> = {
	chain: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>): Task<B> => {
		return async function chainedTask(): Promise<B> {
			const a = await ma()
			const mb = f(a)
			return mb()
		}
	},
	of: <A>(value: A): Task<A> => {
		return function pureTask(): Promise<A> {
			return Promise.resolve(value)
		}
	}
}

//++ Task monad helper functions
export function fromPromise<A>(promise: Promise<A>): Task<A> {
	return function taskFromPromise(): Promise<A> {
		return promise
	}
}

export function delay<A>(ms: number) {
	return function delayTask(value: A): Task<A> {
		return async function delayedTask(): Promise<A> {
			await new Promise<void>(resolve => setTimeout(resolve, ms))
			return value
		}
	}
}

export function parallel<A>(tasks: Array<Task<A>>): Task<Array<A>> {
	return async function runParallel(): Promise<Array<A>> {
		const promises = tasks.map(task => task())
		return Promise.all(promises)
	}
}

export function race<A>(tasks: Array<Task<A>>): Task<A> {
	return async function runRace(): Promise<A> {
		const promises = tasks.map(task => task())
		return Promise.race(promises)
	}
}

//++ Specialized do-notation for Task monad with async operations
export default function doTask<A>(
	genFn: () => Generator<Task<any>, A, any>
): Task<A> {
	return doNotation(TaskMonad)(genFn)
}

//?? [EXAMPLE] doTask(function* () { const x = yield fromPromise(fetch('/api')); return x.json() })
//?? [EXAMPLE] doTask(function* () { const x = yield delay(1000)(5); return x * 2 })
//?? [EXAMPLE] doTask(function* () { const [a, b] = yield parallel([taskA, taskB]); return a + b })
/*??
 * [EXAMPLE]
 * // Sequential async operations
 * const fetchUserData = (userId: string) => doTask<UserProfile>(function* () {
 *   const user = yield fromPromise(fetch(`/api/users/${userId}`).then(r => r.json()))
 *   const posts = yield fromPromise(fetch(`/api/posts?userId=${userId}`).then(r => r.json()))
 *   const friends = yield fromPromise(fetch(`/api/friends?userId=${userId}`).then(r => r.json()))
 *   
 *   return {
 *     ...user,
 *     postCount: posts.length,
 *     friendCount: friends.length
 *   }
 * })
 * 
 * // Run it
 * const task = fetchUserData("123")
 * const result = await task()  // Execute the task
 * 
 * // Parallel operations
 * const fetchMultipleUsers = (userIds: string[]) => doTask<User[]>(function* () {
 *   const tasks = userIds.map(id => 
 *     fromPromise(fetch(`/api/users/${id}`).then(r => r.json()))
 *   )
 *   const users = yield parallel(tasks)
 *   return users
 * })
 * 
 * // With delays and retries
 * const robustFetch = (url: string) => doTask<Response>(function* () {
 *   const attempt1 = yield fromPromise(fetch(url).catch(() => null))
 *   if (attempt1) return attempt1
 *   
 *   yield delay(1000)("Retrying...")
 *   const attempt2 = yield fromPromise(fetch(url).catch(() => null))
 *   if (attempt2) return attempt2
 *   
 *   yield delay(2000)("Final retry...")
 *   const attempt3 = yield fromPromise(fetch(url))
 *   return attempt3
 * })
 * 
 * [GOTCHA] Tasks are lazy - they don't run until you call them
 * [GOTCHA] Each task execution creates a new Promise
 * [PRO] Composable async operations without await soup
 * [PRO] Lazy evaluation allows building complex async pipelines
 */