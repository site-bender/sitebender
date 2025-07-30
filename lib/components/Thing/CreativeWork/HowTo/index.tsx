import type BaseProps from "../../../../types/index.ts"
import type HowToProps from "../../../../types/Thing/CreativeWork/HowTo/index.ts"

import CreativeWork from "../index.tsx"

export type Props = HowToProps & BaseProps

export default function HowTo({
	estimatedCost,
	performTime,
	prepTime,
	step,
	steps,
	supply,
	tool,
	totalTime,
	yield,
	_type = "HowTo",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
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
		>{children}</CreativeWork>
	)
}
