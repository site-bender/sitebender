/**
 * IsSameDate JSX Component
 */
import IsSameDateConstructor from "@adaptiveSrc/constructors/comparators/date/IsSameDate/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type IsSameDateProps = {
  type?: "Date"
  datatype?: "Date"
  children?: JSX.Element | JSX.Element[]
}

export default function IsSameDate({
  type = "Date",
  datatype,
  children = [],
}: IsSameDateProps): ReturnType<ReturnType<ReturnType<typeof IsSameDateConstructor>>> {
  const actualType = datatype || type
  const [operand, test] = Array.isArray(children) ? children : [children]
  // IsSameDate: (datatype) => (operand) => (test)
  return IsSameDateConstructor(actualType)(operand as unknown as Operand)(
    test as unknown as Operand,
  )
}
