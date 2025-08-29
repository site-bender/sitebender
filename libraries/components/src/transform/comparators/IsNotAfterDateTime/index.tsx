/**
 * IsNotAfterDateTime JSX Component
 */
import IsNotAfterDateTimeConstructor from "@adaptiveSrc/constructors/comparators/dateTime/IsNotAfterDateTime/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type IsNotAfterDateTimeProps = {
  type?: "DateTime"
  datatype?: "DateTime"
  children?: JSX.Element | JSX.Element[]
}

export default function IsNotAfterDateTime({
  type = "DateTime",
  datatype,
  children = [],
}: IsNotAfterDateTimeProps): ReturnType<ReturnType<ReturnType<typeof IsNotAfterDateTimeConstructor>>> {
  const actualType = datatype || type
  const [operand, test] = Array.isArray(children) ? children : [children]
  // IsNotAfterDateTime: (datatype) => (operand) => (test)
  return IsNotAfterDateTimeConstructor(actualType)(
    operand as unknown as Operand,
  )(test as unknown as Operand)
}
