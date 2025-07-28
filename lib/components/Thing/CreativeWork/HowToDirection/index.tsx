import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { HowToDirectionProps } from "../../../../types/Thing/CreativeWork/HowToDirection/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	HowToDirectionProps,
	"HowToDirection",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function HowToDirection({
	afterMedia,
	beforeMedia,
	duringMedia,
	performTime,
	prepTime,
	supply,
	tool,
	totalTime,
	schemaType = "HowToDirection",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				afterMedia,
				beforeMedia,
				duringMedia,
				performTime,
				prepTime,
				supply,
				tool,
				totalTime,
				...subtypeProperties,
			}}
		/>
	)
}
