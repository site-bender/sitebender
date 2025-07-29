import type BaseProps from "../../../../../../types/index.ts"
import type HowToToolProps from "../../../../../../types/Thing/Intangible/ListItem/HowToItem/HowToTool/index.ts"

import HowToItem from "../index.tsx"

export type Props = HowToToolProps & BaseProps

export default function HowToTool({
	_type = "HowToTool",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<HowToItem
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
