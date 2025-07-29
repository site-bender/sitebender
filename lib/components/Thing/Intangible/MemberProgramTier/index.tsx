import type BaseProps from "../../../../types/index.ts"
import type MemberProgramTierProps from "../../../../types/Thing/Intangible/MemberProgramTier/index.ts"

import Intangible from "../index.tsx"

export type Props = MemberProgramTierProps & BaseProps

export default function MemberProgramTier({
	hasTierBenefit,
	hasTierRequirement,
	isTierOf,
	membershipPointsEarned,
	_type = "MemberProgramTier",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				hasTierBenefit,
				hasTierRequirement,
				isTierOf,
				membershipPointsEarned,
				...subtypeProperties,
			}}
		/>
	)
}
