// Table extends WebPageElement but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface TableProps {}

type Table =
	& Thing
	& CreativeWorkProps
	& WebPageElementProps
	& TableProps

export default Table
