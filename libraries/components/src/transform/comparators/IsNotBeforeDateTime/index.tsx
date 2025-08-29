/**
 * IsNotBeforeDateTime JSX Component
 */
import IsNotBeforeDateTimeConstructor from "@adaptiveSrc/constructors/comparators/dateTime/IsNotBeforeDateTime/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type IsNotBeforeDateTimeProps = {
  type?: "DateTime"
  datatype?: "DateTime"
  children?: JSX.Element | JSX.Element[]
}

export default function IsNotBeforeDateTime({
  type = "DateTime",
  datatype,
  children = [],
}: IsNotBeforeDateTimeProps): ReturnType<ReturnType<ReturnType<typeof IsNotBeforeDateTimeConstructor>>> {
  const actualType = datatype || type
  const [operand, test] = Array.isArray(children) ? children : [children]
  // IsNotBeforeDateTime: (datatype) => (operand) => (test)
  return IsNotBeforeDateTimeConstructor(actualType)(
    operand as unknown as Operand,
  )(test as unknown as Operand)
}
