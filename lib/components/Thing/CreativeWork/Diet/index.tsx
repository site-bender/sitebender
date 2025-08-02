import type BaseProps from "../../../../types/index.ts"
import type DietProps from "../../../../types/Thing/CreativeWork/Diet/index.ts"

import CreativeWork from "../index.tsx"

export type Props = DietProps & BaseProps

export default function Diet({
	dietFeatures,
	endorsers,
	expertConsiderations,
	physiologicalBenefits,
	risks,
	_type = "Diet",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				dietFeatures,
				endorsers,
				expertConsiderations,
				physiologicalBenefits,
				risks,
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWork>
	)
}
