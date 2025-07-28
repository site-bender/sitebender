import type BaseProps from "../../../../types/index.ts"
import type { LearningResourceProps } from "../../../../types/Thing/CreativeWork/LearningResource/index.ts"

import CreativeWork from "../index.tsx"

export type Props = LearningResourceProps & BaseProps

export default function LearningResource({
	assesses,
	competencyRequired,
	educationalAlignment,
	educationalLevel,
	educationalUse,
	learningResourceType,
	teaches,
	_type = "LearningResource",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				assesses,
				competencyRequired,
				educationalAlignment,
				educationalLevel,
				educationalUse,
				learningResourceType,
				teaches,
				...subtypeProperties,
			}}
		/>
	)
}
