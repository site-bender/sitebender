import type BaseProps from "../../../../types/index.ts"
import type { SeekToActionProps } from "../../../../types/Thing/Action/SeekToAction/index.ts"

import Action from "../index.tsx"

export type Props = SeekToActionProps & BaseProps

export default function SeekToAction({
	startOffset,
	_type = "SeekToAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Action
			{...props}
			_type={_type}
			subtypeProperties={{
				startOffset,
				...subtypeProperties,
			}}
		/>
	)
}
