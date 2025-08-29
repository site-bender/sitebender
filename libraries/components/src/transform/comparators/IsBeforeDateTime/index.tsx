/**
 * IsBeforeDateTime JSX Component
 */
import IsBeforeDateTimeConstructor from "@adaptiveSrc/constructors/comparators/dateTime/IsBeforeDateTime/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type IsBeforeDateTimeProps = {
  type?: "DateTime"
  datatype?: "DateTime"
  children?: JSX.Element | JSX.Element[]
}

export default function IsBeforeDateTime({
  type = "DateTime",
  datatype,
  children = [],
}: IsBeforeDateTimeProps): ReturnType<ReturnType<ReturnType<typeof IsBeforeDateTimeConstructor>>> {
  const actualType = datatype || type
  const [operand, test] = Array.isArray(children) ? children : [children]
  // IsBeforeDateTime: (datatype) => (operand) => (test)
  return IsBeforeDateTimeConstructor(actualType)(operand as unknown as Operand)(test as unknown as Operand)
}
