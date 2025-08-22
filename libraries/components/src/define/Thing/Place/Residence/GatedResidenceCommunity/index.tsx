import type BaseProps from "../../../../../types/index.ts"
import type { GatedResidenceCommunity as GatedResidenceCommunityProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = GatedResidenceCommunityProps & BaseProps

export default function GatedResidenceCommunity({
	_type = "GatedResidenceCommunity",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
