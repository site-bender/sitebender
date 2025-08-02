import type BaseProps from "../../../../types/index.ts"
import type HowToTipProps from "../../../../types/Thing/CreativeWork/HowToTip/index.ts"

import CreativeWork from "../index.tsx"

export type Props = HowToTipProps & BaseProps

export default function HowToTip({
	_type = "HowToTip",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWork>
	)
}
