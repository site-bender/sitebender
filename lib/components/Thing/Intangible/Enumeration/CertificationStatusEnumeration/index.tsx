import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CertificationStatusEnumerationProps from "../../../../../types/Thing/CertificationStatusEnumeration/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"

import Enumeration from "./index.tsx"

// CertificationStatusEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	CertificationStatusEnumerationProps,
	"CertificationStatusEnumeration",
	ExtractLevelProps<CertificationStatusEnumerationProps, EnumerationProps>
>

export default function CertificationStatusEnumeration({
	schemaType = "CertificationStatusEnumeration",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
