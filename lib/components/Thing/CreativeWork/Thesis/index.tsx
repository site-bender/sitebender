import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { ThesisProps } from "../../../../types/Thing/CreativeWork/Thesis/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	ThesisProps,
	"Thesis",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function Thesis({
	inSupportOf,
	schemaType = "Thesis",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				inSupportOf,
				...subtypeProperties,
			}}
		/>
	)
}
