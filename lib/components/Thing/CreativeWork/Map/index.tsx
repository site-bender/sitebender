import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { MapProps } from "../../../../types/Thing/CreativeWork/Map/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	MapProps,
	"Map",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function Map({
	mapType,
	schemaType = "Map",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				mapType,
				...subtypeProperties,
			}}
		/>
	)
}
