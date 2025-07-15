import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LegislationProps from "../../../../../types/Thing/Legislation/index.ts"
import type LegislationObjectProps from "../../../../../types/Thing/LegislationObject/index.ts"

import Legislation from "./index.tsx"

export type Props = BaseComponentProps<
	LegislationObjectProps,
	"LegislationObject",
	ExtractLevelProps<LegislationObjectProps, LegislationProps>
>

export default function LegislationObject(
	{
		legislationLegalValue,
		schemaType = "LegislationObject",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
