import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CertificationProps from "../../../../types/Thing/Certification/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	CertificationProps,
	"Certification",
	ExtractLevelProps<CertificationProps, CreativeWorkProps>
>

export default function Certification(
	{
		about,
		auditDate,
		certificationIdentification,
		certificationRating,
		certificationStatus,
		datePublished,
		expires,
		hasMeasurement,
		issuedBy,
		logo,
		validFrom,
		validIn,
		schemaType = "Certification",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				about,
				auditDate,
				certificationIdentification,
				certificationRating,
				certificationStatus,
				datePublished,
				expires,
				hasMeasurement,
				issuedBy,
				logo,
				validFrom,
				validIn,
				...subtypeProperties,
			}}
		/>
	)
}
