import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { FindActionProps } from "../index.ts"

import DiscoverActionComponent from "../../../../../../components/Thing/Action/FindAction/DiscoverAction/index.tsx"

export interface DiscoverActionProps {
}

type DiscoverAction =
	& Thing
	& ActionProps
	& FindActionProps
	& DiscoverActionProps

export default DiscoverAction
