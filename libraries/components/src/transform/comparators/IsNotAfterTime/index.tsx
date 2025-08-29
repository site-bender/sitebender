/**
 * IsNotAfterTime JSX Component
 */
import IsNotAfterTimeConstructor from "@adaptiveSrc/constructors/comparators/time/IsNotAfterTime/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type IsNotAfterTimeProps = {
  type?: "Time"
  datatype?: "Time"
  children?: JSX.Element | JSX.Element[]
}

export default function IsNotAfterTime({
  type = "Time",
  datatype,
  children = [],
}: IsNotAfterTimeProps): ReturnType<ReturnType<ReturnType<typeof IsNotAfterTimeConstructor>>> {
  const actualType = datatype || type
  const [operand, test] = Array.isArray(children) ? children : [children]
  // IsNotAfterTime: (datatype) => (operand) => (test)
  return IsNotAfterTimeConstructor(actualType)(operand as unknown as Operand)(test as unknown as Operand)
}
