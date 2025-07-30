import type BaseProps from "../../../../../types/index.ts"
import type GatedResidenceCommunityProps from "../../../../../types/Thing/Place/Residence/GatedResidenceCommunity/index.ts"

import Residence from "../index.tsx"

export type Props = GatedResidenceCommunityProps & BaseProps

export default function GatedResidenceCommunity({
	_type = "GatedResidenceCommunity",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Residence
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Residence>
	)
}
