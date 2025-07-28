import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { SoftwareApplicationProps } from "../../../../../types/Thing/CreativeWork/SoftwareApplication/index.ts"
import type { WebApplicationProps } from "../../../../../types/Thing/CreativeWork/SoftwareApplication/WebApplication/index.ts"

import SoftwareApplication from "../index.tsx"

export type Props = BaseComponentProps<
	WebApplicationProps,
	"WebApplication",
	ExtractLevelProps<ThingProps, CreativeWorkProps, SoftwareApplicationProps>
>

export default function WebApplication({
	browserRequirements,
	schemaType = "WebApplication",
	subtypeProperties = {},
	...props
}): Props {
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
