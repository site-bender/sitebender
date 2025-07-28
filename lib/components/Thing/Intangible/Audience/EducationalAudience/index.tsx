import type BaseProps from "../../../../../types/index.ts"
import type { EducationalAudienceProps } from "../../../../../types/Thing/Intangible/Audience/EducationalAudience/index.ts"

import Audience from "../index.tsx"

export type Props = EducationalAudienceProps & BaseProps

export default function EducationalAudience({
	educationalRole,
	_type = "EducationalAudience",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Audience
			{...props}
			_type={_type}
			subtypeProperties={{
				educationalRole,
				...subtypeProperties,
			}}
		/>
	)
}
