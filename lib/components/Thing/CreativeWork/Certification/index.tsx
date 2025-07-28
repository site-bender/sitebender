import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { CertificationProps } from "../../../../types/Thing/CreativeWork/Certification/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	CertificationProps,
	"Certification",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function Certification({
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
}): Props {
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
