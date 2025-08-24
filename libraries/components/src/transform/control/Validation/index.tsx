/**
 * Validation control component
 *
 * Wraps a comparator graph (from transform/*) and attaches it to the nearest
 * field/element anchor in IR. This component does not render DOM; it returns
 * a marker object consumed by the compile pass.
 */

export type Props = {
  when?: "input" | "blur" | "submit"
  children?: JSX.Element | Array<JSX.Element>
}

export type ValidationMarker = {
  __kind: "control:validation"
  when: "input" | "blur" | "submit"
  rule: JSX.Element | Array<JSX.Element> | undefined
}

export default function Validation({ when = "input", children }: Props): ValidationMarker {
  return { __kind: "control:validation", when, rule: children }
}
