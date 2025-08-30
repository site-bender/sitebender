/**
 * IsAfterTime JSX Component
 */
import IsAfterTimeConstructor from "@adaptiveSrc/constructors/comparators/time/IsAfterTime/index.ts"
import type { IsAfterTimeComparator, Operand } from "@adaptiveTypes/index.ts"

export type Props = {
  type?: "Time"
  datatype?: "Time"
  children?: JSX.Element | JSX.Element[]
}

export default function IsAfterTime({
  type = "Time",
  datatype,
  children = [],
}: Props): IsAfterTimeComparator {
  const actualType = datatype || type
  const [operand, test] = Array.isArray(children) ? children : [children]
  // IsAfterTime: (datatype) => (operand) => (test)
  return IsAfterTimeConstructor(actualType)(
    operand as unknown as Operand,
  )(test as unknown as Operand) as unknown as IsAfterTimeComparator
}
