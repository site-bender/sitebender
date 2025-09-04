import type { State } from "../state/index.ts"

const chain = <A, B, S>(
  f: (a: A) => State<S, B>,
) => (sa: State<S, A>): State<S, B> => (s: S) => {
  const [a, s1] = sa(s)
  return f(a)(s1)
}

export default chain
