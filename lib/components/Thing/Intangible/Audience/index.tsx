import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { AudienceProps } from "../../../../types/Thing/Intangible/Audience/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	AudienceProps,
	"Audience",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function Audience({
	audienceType,
	geographicArea,
	schemaType = "Audience",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				audienceType,
				geographicArea,
				...subtypeProperties,
			}}
		/>
	)
}
