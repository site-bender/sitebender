import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type GatedResidenceCommunityProps from "../../../../../types/Thing/GatedResidenceCommunity/index.ts"
import type ResidenceProps from "../../../../../types/Thing/Residence/index.ts"

import Residence from "./index.tsx"

// GatedResidenceCommunity adds no properties to the Residence schema type
export type Props = BaseComponentProps<
	GatedResidenceCommunityProps,
	"GatedResidenceCommunity",
	ExtractLevelProps<GatedResidenceCommunityProps, ResidenceProps>
>

export default function GatedResidenceCommunity({
	schemaType = "GatedResidenceCommunity",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Residence
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
