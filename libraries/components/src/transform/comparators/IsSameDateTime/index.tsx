/**
 * IsSameDateTime JSX Component
 */
import IsSameDateTimeConstructor from "@adaptiveSrc/constructors/comparators/dateTime/IsSameDateTime/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type IsSameDateTimeProps = {
  type?: "DateTime"
  datatype?: "DateTime"
  children?: JSX.Element | JSX.Element[]
}

export default function IsSameDateTime({
  type = "DateTime",
  datatype,
  children = [],
}: IsSameDateTimeProps): ReturnType<ReturnType<ReturnType<typeof IsSameDateTimeConstructor>>> {
  const actualType = datatype || type
  const [operand, test] = Array.isArray(children) ? children : [children]
  // IsSameDateTime: (datatype) => (operand) => (test)
  return IsSameDateTimeConstructor(actualType)(
    operand as unknown as Operand,
  )(test as unknown as Operand)
}
