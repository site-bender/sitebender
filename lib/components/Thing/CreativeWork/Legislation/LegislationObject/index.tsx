import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { LegislationProps } from "../../../../../types/Thing/CreativeWork/Legislation/index.ts"
import type { LegislationObjectProps } from "../../../../../types/Thing/CreativeWork/Legislation/LegislationObject/index.ts"

import Legislation from "../index.tsx"

export type Props = BaseComponentProps<
	LegislationObjectProps,
	"LegislationObject",
	ExtractLevelProps<ThingProps, CreativeWorkProps, LegislationProps>
>

export default function LegislationObject({
	legislationLegalValue,
	schemaType = "LegislationObject",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Legislation
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				legislationLegalValue,
				...subtypeProperties,
			}}
		/>
	)
}
