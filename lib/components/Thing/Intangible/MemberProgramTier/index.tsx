import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { MemberProgramTierProps } from "../../../../types/Thing/Intangible/MemberProgramTier/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	MemberProgramTierProps,
	"MemberProgramTier",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function MemberProgramTier({
	hasTierBenefit,
	hasTierRequirement,
	isTierOf,
	membershipPointsEarned,
	schemaType = "MemberProgramTier",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
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
