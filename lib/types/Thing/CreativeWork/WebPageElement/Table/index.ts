import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

export interface TableProps {
	"@type"?: "Table"}

type Table = Thing & CreativeWorkProps & WebPageElementProps & TableProps

export default Table
