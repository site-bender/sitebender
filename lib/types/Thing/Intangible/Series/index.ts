import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface SeriesProps {}

type Series = Thing & IntangibleProps & SeriesProps

export default Series
