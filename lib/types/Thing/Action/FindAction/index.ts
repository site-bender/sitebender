import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

import FindActionComponent from "../../../../../components/Thing/Action/FindAction/index.tsx"

export interface FindActionProps {
}

type FindAction =
	& Thing
	& ActionProps
	& FindActionProps

export default FindAction
