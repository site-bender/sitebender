/**
 * IsAfterDateTime JSX Component
 */
import IsAfterDateTimeConstructor from "@adaptiveSrc/constructors/comparators/dateTime/IsAfterDateTime/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type IsAfterDateTimeProps = {
  type?: "DateTime"
  datatype?: "DateTime"
  children?: JSX.Element | JSX.Element[]
}

export default function IsAfterDateTime({
  type = "DateTime",
  datatype,
  children = [],
}: IsAfterDateTimeProps): ReturnType<ReturnType<ReturnType<typeof IsAfterDateTimeConstructor>>> {
  const actualType = datatype || type
  const [operand, test] = Array.isArray(children) ? children : [children]
  // IsAfterDateTime: (datatype) => (operand) => (test)
  return IsAfterDateTimeConstructor(actualType)(operand as unknown as Operand)(test as unknown as Operand)
}
