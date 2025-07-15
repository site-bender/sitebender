import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AnatomicalStructureProps from "../../../../../types/Thing/AnatomicalStructure/index.ts"
import type NerveProps from "../../../../../types/Thing/Nerve/index.ts"

import AnatomicalStructure from "./index.tsx"

export type Props = BaseComponentProps<
	NerveProps,
	"Nerve",
	ExtractLevelProps<NerveProps, AnatomicalStructureProps>
>

export default function Nerve(
	{
		branch,
		nerveMotor,
		sensoryUnit,
		sourcedFrom,
		schemaType = "Nerve",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<AnatomicalStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				branch,
				nerveMotor,
				sensoryUnit,
				sourcedFrom,
				...subtypeProperties,
			}}
		/>
	)
}
