import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ChooseActionProps from "../../../../../../types/Thing/ChooseAction/index.ts"
import type VoteActionProps from "../../../../../../types/Thing/VoteAction/index.ts"

import ChooseAction from "./index.tsx"

export type Props = BaseComponentProps<
	VoteActionProps,
	"VoteAction",
	ExtractLevelProps<VoteActionProps, ChooseActionProps>
>

export default function VoteAction(
	{
		candidate,
		schemaType = "VoteAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
