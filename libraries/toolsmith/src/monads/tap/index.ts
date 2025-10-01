//++ Transparently executes a side effect without affecting the monadic value
export default function tap<A>(sideEffect: (value: A) => void) {
	return function executeWithValue(value: A): A {
		sideEffect(value)
		return value
	}
}
