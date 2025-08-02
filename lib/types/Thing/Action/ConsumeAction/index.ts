import type Thing from "../../index.ts"
import type ActionAccessSpecification from "../../Intangible/ActionAccessSpecification/index.ts"
import type Offer from "../../Intangible/Offer/index.ts"
import type { ActionProps } from "../index.ts"
import type { DrinkActionType } from "./DrinkAction/index.ts"
import type { EatActionType } from "./EatAction/index.ts"
import type { InstallActionType } from "./InstallAction/index.ts"
import type { ListenActionType } from "./ListenAction/index.ts"
import type { PlayGameActionType } from "./PlayGameAction/index.ts"
import type { ReadActionType } from "./ReadAction/index.ts"
import type { UseActionType } from "./UseAction/index.ts"
import type { ViewActionType } from "./ViewAction/index.ts"
import type { WatchActionType } from "./WatchAction/index.ts"

import ActionAccessSpecificationComponent from "../../../../components/Thing/Intangible/ActionAccessSpecification/index.ts"
import OfferComponent from "../../../../components/Thing/Intangible/Offer/index.ts"

export type ConsumeActionType =
	| "ConsumeAction"
	| WatchActionType
	| EatActionType
	| UseActionType
	| ReadActionType
	| ListenActionType
	| DrinkActionType
	| InstallActionType
	| PlayGameActionType
	| ViewActionType

export interface ConsumeActionProps {
	"@type"?: ConsumeActionType
	actionAccessibilityRequirement?:
		| ActionAccessSpecification
		| ReturnType<typeof ActionAccessSpecificationComponent>
	expectsAcceptanceOf?: Offer | ReturnType<typeof OfferComponent>
}

type ConsumeAction = Thing & ActionProps & ConsumeActionProps

export default ConsumeAction
