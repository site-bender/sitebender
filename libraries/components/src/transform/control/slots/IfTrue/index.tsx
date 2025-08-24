/**
 * IfTrue slot component (marker)
 */

export type Props = { children?: JSX.Element | Array<JSX.Element> }

export default function IfTrue({ children }: Props) {
  return { __kind: "slot:iftrue", children }
}
