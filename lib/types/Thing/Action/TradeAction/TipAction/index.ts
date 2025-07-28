import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"
import type Audience from "../../../Intangible/Audience/index.ts"
import type ContactPoint from "../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"

import TipActionComponent from "../../../../../../components/Thing/Action/TradeAction/TipAction/index.tsx"

export interface TipActionProps {
	recipient?: Audience | ContactPoint | Organization | Person
}

type TipAction =
	& Thing
	& ActionProps
	& TradeActionProps
	& TipActionProps

export default TipAction
