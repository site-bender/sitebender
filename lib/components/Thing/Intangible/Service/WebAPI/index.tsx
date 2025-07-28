import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { ServiceProps } from "../../../../../types/Thing/Intangible/Service/index.ts"
import type { WebAPIProps } from "../../../../../types/Thing/Intangible/Service/WebAPI/index.ts"

import Service from "../index.tsx"

export type Props = BaseComponentProps<
	WebAPIProps,
	"WebAPI",
	ExtractLevelProps<ThingProps, IntangibleProps, ServiceProps>
>

export default function WebAPI({
	documentation,
	schemaType = "WebAPI",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Service
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				documentation,
				...subtypeProperties,
			}}
		/>
	)
}
