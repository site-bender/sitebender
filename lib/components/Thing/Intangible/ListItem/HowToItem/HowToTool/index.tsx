import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HowToItemProps from "../../../../../../types/Thing/HowToItem/index.ts"
import type HowToToolProps from "../../../../../../types/Thing/HowToTool/index.ts"

import HowToItem from "./index.tsx"

// HowToTool adds no properties to the HowToItem schema type
export type Props = BaseComponentProps<
	HowToToolProps,
	"HowToTool",
	ExtractLevelProps<HowToToolProps, HowToItemProps>
>

export default function HowToTool({
	schemaType = "HowToTool",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<HowToItem
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
