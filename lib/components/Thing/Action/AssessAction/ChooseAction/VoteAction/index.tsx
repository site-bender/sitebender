import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../../types/Thing/Action/index.ts"
import type { AssessActionProps } from "../../../../../../types/Thing/Action/AssessAction/index.ts"
import type { ChooseActionProps } from "../../../../../../types/Thing/Action/AssessAction/ChooseAction/index.ts"
import type { VoteActionProps } from "../../../../../../types/Thing/Action/AssessAction/ChooseAction/VoteAction/index.ts"

import ChooseAction from "../index.tsx"

export type Props = BaseComponentProps<
	VoteActionProps,
	"VoteAction",
	ExtractLevelProps<ThingProps, ActionProps, AssessActionProps, ChooseActionProps>
>

export default function VoteAction({
	candidate,
	schemaType = "VoteAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<ChooseAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				candidate,
				...subtypeProperties,
			}}
		/>
	)
}
