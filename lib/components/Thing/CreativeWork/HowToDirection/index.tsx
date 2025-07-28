import type BaseProps from "../../../../types/index.ts"
import type { HowToDirectionProps } from "../../../../types/Thing/CreativeWork/HowToDirection/index.ts"

import CreativeWork from "../index.tsx"

export type Props = HowToDirectionProps & BaseProps

export default function HowToDirection({
	afterMedia,
	beforeMedia,
	duringMedia,
	performTime,
	prepTime,
	supply,
	tool,
	totalTime,
	_type = "HowToDirection",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
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
