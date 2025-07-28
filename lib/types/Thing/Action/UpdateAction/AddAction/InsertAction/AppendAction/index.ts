import type Thing from "../../../../../index.ts"
import type { ActionProps } from "../../../../index.ts"
import type { UpdateActionProps } from "../../../index.ts"
import type { AddActionProps } from "../../index.ts"
import type { InsertActionProps } from "../index.ts"

import AppendActionComponent from "../../../../../../../../components/Thing/Action/UpdateAction/AddAction/InsertAction/AppendAction/index.tsx"

export interface AppendActionProps {
}

type AppendAction =
	& Thing
	& ActionProps
	& UpdateActionProps
	& AddActionProps
	& InsertActionProps
	& AppendActionProps

export default AppendAction
