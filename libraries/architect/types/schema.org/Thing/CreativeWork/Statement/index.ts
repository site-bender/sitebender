import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type StatementType = "Statement"

export interface StatementProps {
	"@type"?: StatementType
}

type Statement = Thing & CreativeWorkProps & StatementProps

export default Statement
