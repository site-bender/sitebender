import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import StatementComponent from "../../../../../components/Thing/CreativeWork/Statement/index.tsx"

export interface StatementProps {
}

type Statement =
	& Thing
	& CreativeWorkProps
	& StatementProps

export default Statement
