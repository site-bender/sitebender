import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BedTypeProps from "../../../../../../types/Thing/BedType/index.ts"
import type QualitativeValueProps from "../../../../../../types/Thing/QualitativeValue/index.ts"

import QualitativeValue from "../index.tsx"

// BedType adds no properties to the QualitativeValue schema type
export type Props = BaseComponentProps<
	BedTypeProps,
	"BedType",
	ExtractLevelProps<BedTypeProps, QualitativeValueProps>
>

export default function BedType({
	schemaType = "BedType",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<QualitativeValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
