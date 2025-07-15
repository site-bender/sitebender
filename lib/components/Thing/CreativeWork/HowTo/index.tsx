import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type HowToProps from "../../../../types/Thing/HowTo/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	HowToProps,
	"HowTo",
	ExtractLevelProps<HowToProps, CreativeWorkProps>
>

export default function HowTo(
	{
		estimatedCost,
		performTime,
		prepTime,
		step,
		steps,
		supply,
		tool,
		totalTime,
		yield,
		schemaType = "HowTo",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				estimatedCost,
				performTime,
				prepTime,
				step,
				steps,
				supply,
				tool,
				totalTime,
				yield,
				...subtypeProperties,
			}}
		/>
	)
}
