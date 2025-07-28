import type BaseProps from "../../../../types/index.ts"
import type { CertificationProps } from "../../../../types/Thing/CreativeWork/Certification/index.ts"

import CreativeWork from "../index.tsx"

export type Props = CertificationProps & BaseProps

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
	_type = "Certification",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
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
