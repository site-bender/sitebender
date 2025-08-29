/**
 * IsNotBeforeDate JSX Component
 */
import IsNotBeforeDateConstructor from "@adaptiveSrc/constructors/comparators/date/IsNotBeforeDate/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

export type IsNotBeforeDateProps = {
  type?: "Date"
  datatype?: "Date"
  children?: JSX.Element | JSX.Element[]
}

export default function IsNotBeforeDate({
  type = "Date",
  datatype,
  children = [],
}: IsNotBeforeDateProps): ReturnType<ReturnType<ReturnType<typeof IsNotBeforeDateConstructor>>> {
  const actualType = datatype || type
  const [operand, test] = Array.isArray(children) ? children : [children]
  return IsNotBeforeDateConstructor(actualType)(operand as unknown as Operand)(test as unknown as Operand)
}
