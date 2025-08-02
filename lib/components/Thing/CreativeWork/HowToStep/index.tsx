import type BaseProps from "../../../../types/index.ts"
import type HowToStepProps from "../../../../types/Thing/CreativeWork/HowToStep/index.ts"

import CreativeWork from "../index.tsx"

export type Props = HowToStepProps & BaseProps

export default function HowToStep({
	_type = "HowToStep",
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
