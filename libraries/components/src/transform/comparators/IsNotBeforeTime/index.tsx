/**
 * IsNotBeforeTime JSX Component
 */
import IsNotBeforeTimeConstructor from "@adaptiveSrc/constructors/comparators/time/IsNotBeforeTime/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type IsNotBeforeTimeProps = {
  type?: "Time"
  datatype?: "Time"
  children?: JSX.Element | JSX.Element[]
}

export default function IsNotBeforeTime({
  type = "Time",
  datatype,
  children = [],
}: IsNotBeforeTimeProps): ReturnType<ReturnType<ReturnType<typeof IsNotBeforeTimeConstructor>>> {
  const actualType = datatype || type
  const [operand, test] = Array.isArray(children) ? children : [children]
  // IsNotBeforeTime: (datatype) => (operand) => (test)
  return IsNotBeforeTimeConstructor(actualType)(operand as unknown as Operand)(test as unknown as Operand)
}
