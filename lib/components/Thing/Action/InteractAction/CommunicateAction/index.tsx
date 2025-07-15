import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CommunicateActionProps from "../../../../../types/Thing/CommunicateAction/index.ts"
import type InteractActionProps from "../../../../../types/Thing/InteractAction/index.ts"

import InteractAction from "./index.tsx"

export type Props = BaseComponentProps<
	CommunicateActionProps,
	"CommunicateAction",
	ExtractLevelProps<CommunicateActionProps, InteractActionProps>
>

export default function CommunicateAction(
	{
		about,
		inLanguage,
		language,
		recipient,
		schemaType = "CommunicateAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<InteractAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				about,
				inLanguage,
				language,
				recipient,
				...subtypeProperties,
			}}
		/>
	)
}
