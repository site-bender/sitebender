import type { State } from "../state/index.ts"

const modify = <S>(f: (s: S) => S): State<S, S> => (s: S) => {
  const s2 = f(s)
  return [s2, s2]
}

export default modify
