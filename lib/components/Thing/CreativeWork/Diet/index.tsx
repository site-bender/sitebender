import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { DietProps } from "../../../../types/Thing/CreativeWork/Diet/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	DietProps,
	"Diet",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function Diet({
	dietFeatures,
	endorsers,
	expertConsiderations,
	physiologicalBenefits,
	risks,
	schemaType = "Diet",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				dietFeatures,
				endorsers,
				expertConsiderations,
				physiologicalBenefits,
				risks,
				...subtypeProperties,
			}}
		/>
	)
}
