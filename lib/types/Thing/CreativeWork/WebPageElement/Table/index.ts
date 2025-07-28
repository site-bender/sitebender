import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

import TableComponent from "../../../../../../components/Thing/CreativeWork/WebPageElement/Table/index.tsx"

export interface TableProps {
}

type Table =
	& Thing
	& CreativeWorkProps
	& WebPageElementProps
	& TableProps

export default Table
