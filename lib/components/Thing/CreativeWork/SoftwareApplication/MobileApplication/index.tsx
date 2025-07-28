import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { SoftwareApplicationProps } from "../../../../../types/Thing/CreativeWork/SoftwareApplication/index.ts"
import type { MobileApplicationProps } from "../../../../../types/Thing/CreativeWork/SoftwareApplication/MobileApplication/index.ts"

import SoftwareApplication from "../index.tsx"

export type Props = BaseComponentProps<
	MobileApplicationProps,
	"MobileApplication",
	ExtractLevelProps<ThingProps, CreativeWorkProps, SoftwareApplicationProps>
>

export default function MobileApplication({
	carrierRequirements,
	schemaType = "MobileApplication",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<SoftwareApplication
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				carrierRequirements,
				...subtypeProperties,
			}}
		/>
	)
}
