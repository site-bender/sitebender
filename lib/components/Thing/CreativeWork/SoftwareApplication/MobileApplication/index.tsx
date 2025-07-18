import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MobileApplicationProps from "../../../../../types/Thing/MobileApplication/index.ts"
import type SoftwareApplicationProps from "../../../../../types/Thing/SoftwareApplication/index.ts"

import SoftwareApplication from "../index.tsx"

export type Props = BaseComponentProps<
	MobileApplicationProps,
	"MobileApplication",
	ExtractLevelProps<MobileApplicationProps, SoftwareApplicationProps>
>

export default function MobileApplication(
	{
		carrierRequirements,
		schemaType = "MobileApplication",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
