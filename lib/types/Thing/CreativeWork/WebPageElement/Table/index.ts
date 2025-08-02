import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

export type TableType = "Table"

export interface TableProps {
	"@type"?: TableType
}

type Table = Thing & CreativeWorkProps & WebPageElementProps & TableProps

export default Table
