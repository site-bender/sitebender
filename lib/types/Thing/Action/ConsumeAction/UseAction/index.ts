import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

import UseActionComponent from "../../../../../../components/Thing/Action/ConsumeAction/UseAction/index.tsx"

export interface UseActionProps {
}

type UseAction =
	& Thing
	& ActionProps
	& ConsumeActionProps
	& UseActionProps

export default UseAction
