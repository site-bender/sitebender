import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

import InstallActionComponent from "../../../../../../components/Thing/Action/ConsumeAction/InstallAction/index.tsx"

export interface InstallActionProps {
}

type InstallAction =
	& Thing
	& ActionProps
	& ConsumeActionProps
	& InstallActionProps

export default InstallAction
