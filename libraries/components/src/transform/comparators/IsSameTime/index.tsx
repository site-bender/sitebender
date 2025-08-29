/**
 * IsSameTime JSX Component
 */
import IsSameTimeConstructor from "@adaptiveSrc/constructors/comparators/time/IsSameTime/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type IsSameTimeProps = {
  type?: "Time"
  datatype?: "Time"
  children?: JSX.Element | JSX.Element[]
}

export default function IsSameTime({
  type = "Time",
  datatype,
  children = [],
}: IsSameTimeProps): ReturnType<ReturnType<ReturnType<typeof IsSameTimeConstructor>>> {
  const actualType = datatype || type
  const [operand, test] = Array.isArray(children) ? children : [children]
  // IsSameTime: (datatype) => (operand) => (test)
  return IsSameTimeConstructor(actualType)(operand as unknown as Operand)(
    test as unknown as Operand,
  )
}
