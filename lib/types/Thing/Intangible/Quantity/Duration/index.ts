import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { QuantityProps } from "../index.ts"

export interface DurationProps {}

type Duration = Thing & IntangibleProps & QuantityProps & DurationProps

export default Duration
