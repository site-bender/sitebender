import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type EndorseActionProps from "../../../../../../types/Thing/EndorseAction/index.ts"
import type ReactActionProps from "../../../../../../types/Thing/ReactAction/index.ts"

import ReactAction from "../index.tsx"

export type Props = BaseComponentProps<
	EndorseActionProps,
	"EndorseAction",
	ExtractLevelProps<EndorseActionProps, ReactActionProps>
>

export default function EndorseAction(
	{
		endorsee,
		schemaType = "EndorseAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<ReactAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				endorsee,
				...subtypeProperties,
			}}
		/>
	)
}
