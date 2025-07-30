import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface StatementProps {
	"@type"?: "Statement"}

type Statement = Thing & CreativeWorkProps & StatementProps

export default Statement
