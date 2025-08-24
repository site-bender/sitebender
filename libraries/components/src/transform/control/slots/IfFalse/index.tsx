/**
 * IfFalse slot component (marker)
 */

export type Props = { children?: JSX.Element | Array<JSX.Element> }

export default function IfFalse({ children }: Props) {
  return { __kind: "slot:iffalse", children }
}
