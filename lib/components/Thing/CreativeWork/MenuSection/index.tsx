import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { MenuSectionProps } from "../../../../types/Thing/CreativeWork/MenuSection/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	MenuSectionProps,
	"MenuSection",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function MenuSection({
	hasMenuItem,
	hasMenuSection,
	schemaType = "MenuSection",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				hasMenuItem,
				hasMenuSection,
				...subtypeProperties,
			}}
		/>
	)
}
