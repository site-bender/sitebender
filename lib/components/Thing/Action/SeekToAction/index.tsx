import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../types/Thing/Action/index.ts"
import type { SeekToActionProps } from "../../../../types/Thing/Action/SeekToAction/index.ts"

import Action from "../index.tsx"

export type Props = BaseComponentProps<
	SeekToActionProps,
	"SeekToAction",
	ExtractLevelProps<ThingProps, ActionProps>
>

export default function SeekToAction({
	startOffset,
	schemaType = "SeekToAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Action
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				startOffset,
				...subtypeProperties,
			}}
		/>
	)
}
