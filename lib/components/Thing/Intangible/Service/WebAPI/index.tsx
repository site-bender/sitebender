import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ServiceProps from "../../../../../types/Thing/Service/index.ts"
import type WebAPIProps from "../../../../../types/Thing/WebAPI/index.ts"

import Service from "./index.tsx"

export type Props = BaseComponentProps<
	WebAPIProps,
	"WebAPI",
	ExtractLevelProps<WebAPIProps, ServiceProps>
>

export default function WebAPI(
	{
		documentation,
		schemaType = "WebAPI",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
