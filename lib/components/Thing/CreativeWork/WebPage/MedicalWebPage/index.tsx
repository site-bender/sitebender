import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalWebPageProps from "../../../../../types/Thing/MedicalWebPage/index.ts"
import type WebPageProps from "../../../../../types/Thing/WebPage/index.ts"

import WebPage from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalWebPageProps,
	"MedicalWebPage",
	ExtractLevelProps<MedicalWebPageProps, WebPageProps>
>

export default function MedicalWebPage(
	{
		aspect,
		medicalAudience,
		schemaType = "MedicalWebPage",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<WebPage
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				aspect,
				medicalAudience,
				...subtypeProperties,
			}}
		/>
	)
}
