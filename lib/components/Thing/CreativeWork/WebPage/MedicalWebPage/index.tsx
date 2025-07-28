import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { WebPageProps } from "../../../../../types/Thing/CreativeWork/WebPage/index.ts"
import type { MedicalWebPageProps } from "../../../../../types/Thing/CreativeWork/WebPage/MedicalWebPage/index.ts"

import WebPage from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalWebPageProps,
	"MedicalWebPage",
	ExtractLevelProps<ThingProps, CreativeWorkProps, WebPageProps>
>

export default function MedicalWebPage({
	aspect,
	medicalAudience,
	schemaType = "MedicalWebPage",
	subtypeProperties = {},
	...props
}): Props {
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
