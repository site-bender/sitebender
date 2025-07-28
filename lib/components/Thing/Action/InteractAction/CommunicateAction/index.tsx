import type BaseProps from "../../../../../types/index.ts"
import type { CommunicateActionProps } from "../../../../../types/Thing/Action/InteractAction/CommunicateAction/index.ts"

import InteractAction from "../index.tsx"

export type Props = CommunicateActionProps & BaseProps

export default function CommunicateAction({
	about,
	inLanguage,
	language,
	recipient,
	_type = "CommunicateAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<InteractAction
			{...props}
			_type={_type}
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
