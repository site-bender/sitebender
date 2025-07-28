import type Thing from "../../../../../index.ts"
import type { ActionProps } from "../../../../index.ts"
import type { UpdateActionProps } from "../../../index.ts"
import type { AddActionProps } from "../../index.ts"
import type { InsertActionProps } from "../index.ts"

import PrependActionComponent from "../../../../../../../../components/Thing/Action/UpdateAction/AddAction/InsertAction/PrependAction/index.tsx"

export interface PrependActionProps {
}

type PrependAction =
	& Thing
	& ActionProps
	& UpdateActionProps
	& AddActionProps
	& InsertActionProps
	& PrependActionProps

export default PrependAction
