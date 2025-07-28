import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { InteractActionProps } from "../../../../../types/Thing/Action/InteractAction/index.ts"
import type { CommunicateActionProps } from "../../../../../types/Thing/Action/InteractAction/CommunicateAction/index.ts"

import InteractAction from "../index.tsx"

export type Props = BaseComponentProps<
	CommunicateActionProps,
	"CommunicateAction",
	ExtractLevelProps<ThingProps, ActionProps, InteractActionProps>
>

export default function CommunicateAction({
	about,
	inLanguage,
	language,
	recipient,
	schemaType = "CommunicateAction",
	subtypeProperties = {},
	...props
}): Props {
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
