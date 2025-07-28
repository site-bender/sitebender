import type BaseProps from "../../../../types/index.ts"
import type { HowToSectionProps } from "../../../../types/Thing/CreativeWork/HowToSection/index.ts"

import CreativeWork from "../index.tsx"

export type Props = HowToSectionProps & BaseProps

export default function HowToSection({
	_type = "HowToSection",
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
		/>
	)
}
