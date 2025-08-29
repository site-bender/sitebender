/**
 * IsNotSameDate JSX Component
 */
import IsNotSameDateConstructor from "@adaptiveSrc/constructors/comparators/date/IsNotSameDate/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type IsNotSameDateProps = {
  type?: "Date"
  datatype?: "Date"
  children?: JSX.Element | JSX.Element[]
}

export default function IsNotSameDate({
  type = "Date",
  datatype,
  children = [],
}: IsNotSameDateProps): ReturnType<ReturnType<ReturnType<typeof IsNotSameDateConstructor>>> {
  const actualType = datatype || type
  const [operand, test] = Array.isArray(children) ? children : [children]
  return IsNotSameDateConstructor(actualType)(operand as unknown as Operand)(test as unknown as Operand)
}
