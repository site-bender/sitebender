/**
 * NotEmpty comparator (marker) — true if stringified length > 0
 */

export type Props = { children?: JSX.Element | Array<JSX.Element> }

export type ComparatorMarker = {
  __kind: "comparator"
  cmp: string
  args: Array<unknown>
}

export default function NotEmpty({ children }: Props): ComparatorMarker {
  const arg = Array.isArray(children) ? children[0] : children
  return { __kind: "comparator", cmp: "Is.NotEmpty", args: arg ? [arg] : [] }
}
