/**
 * IsBeforeTime JSX Component
 */
import IsBeforeTimeConstructor from "@adaptiveSrc/constructors/comparators/time/IsBeforeTime/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type IsBeforeTimeProps = {
  type?: "Time"
  datatype?: "Time"
  children?: JSX.Element | JSX.Element[]
}

export default function IsBeforeTime({
  type = "Time",
  datatype,
  children = [],
}: IsBeforeTimeProps): ReturnType<ReturnType<ReturnType<typeof IsBeforeTimeConstructor>>> {
  const actualType = datatype || type
  const [operand, test] = Array.isArray(children) ? children : [children]
  // IsBeforeTime: (datatype) => (operand) => (test)
  return IsBeforeTimeConstructor(actualType)(operand as unknown as Operand)(test as unknown as Operand)
}
