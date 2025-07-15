import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type SoftwareApplicationProps from "../../../../../types/Thing/SoftwareApplication/index.ts"
import type WebApplicationProps from "../../../../../types/Thing/WebApplication/index.ts"

import SoftwareApplication from "./index.tsx"

export type Props = BaseComponentProps<
	WebApplicationProps,
	"WebApplication",
	ExtractLevelProps<WebApplicationProps, SoftwareApplicationProps>
>

export default function WebApplication(
	{
		browserRequirements,
		schemaType = "WebApplication",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<SoftwareApplication
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				browserRequirements,
				...subtypeProperties,
			}}
		/>
	)
}
