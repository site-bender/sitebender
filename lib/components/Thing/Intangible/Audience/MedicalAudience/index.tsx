import type BaseProps from "../../../../../types/index.ts"
import type MedicalAudienceProps from "../../../../../types/Thing/Intangible/Audience/MedicalAudience/index.ts"

import Audience from "../index.tsx"

export type Props = MedicalAudienceProps & BaseProps

export default function MedicalAudience({
	_type = "MedicalAudience",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Audience
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Audience>
	)
}
