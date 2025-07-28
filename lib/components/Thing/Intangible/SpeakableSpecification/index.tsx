import type BaseProps from "../../../../types/index.ts"
import type { SpeakableSpecificationProps } from "../../../../types/Thing/Intangible/SpeakableSpecification/index.ts"

import Intangible from "../index.tsx"

export type Props = SpeakableSpecificationProps & BaseProps

export default function SpeakableSpecification({
	cssSelector,
	xpath,
	_type = "SpeakableSpecification",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				cssSelector,
				xpath,
				...subtypeProperties,
			}}
		/>
	)
}
