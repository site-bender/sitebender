import type BaseProps from "../../../../types/index.ts"
import type AudienceProps from "../../../../types/Thing/Intangible/Audience/index.ts"

import Intangible from "../index.tsx"

export type Props = AudienceProps & BaseProps

export default function Audience({
	audienceType,
	geographicArea,
	_type = "Audience",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				audienceType,
				geographicArea,
				...subtypeProperties,
			}}
		>{children}</Intangible>
	)
}
