import type BaseProps from "../../../../../types/index.ts"
import type MedicalWebPageProps from "../../../../../types/Thing/CreativeWork/WebPage/MedicalWebPage/index.ts"

import WebPage from "../index.tsx"

export type Props = MedicalWebPageProps & BaseProps

export default function MedicalWebPage({
	aspect,
	medicalAudience,
	_type = "MedicalWebPage",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<WebPage
			{...props}
			_type={_type}
			subtypeProperties={{
				aspect,
				medicalAudience,
				...subtypeProperties,
			}}
		>{children}</WebPage>
	)
}
