import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../../Intangible/index.ts"
import type HowToSupply from "../../Intangible/ListItem/HowToItem/HowToSupply/index.ts"
import type HowToTool from "../../Intangible/ListItem/HowToItem/HowToTool/index.ts"
import type { ListItemProps } from "../../Intangible/ListItem/index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type MediaObject from "../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import { HowToSupply as HowToSupplyComponent } from "../../../../../components/index.tsx"
import { HowToTool as HowToToolComponent } from "../../../../../components/index.tsx"
import { Duration as DurationComponent } from "../../../../../components/index.tsx"
import { MediaObject as MediaObjectComponent } from "../../../../../components/index.tsx"

export type HowToDirectionType = "HowToDirection"

export interface HowToDirectionProps {
	"@type"?: HowToDirectionType
	afterMedia?: MediaObject | URL | ReturnType<typeof MediaObjectComponent>
	beforeMedia?: MediaObject | URL | ReturnType<typeof MediaObjectComponent>
	duringMedia?: MediaObject | URL | ReturnType<typeof MediaObjectComponent>
	performTime?: Duration | ReturnType<typeof DurationComponent>
	prepTime?: Duration | ReturnType<typeof DurationComponent>
	supply?: HowToSupply | Text | ReturnType<typeof HowToSupplyComponent>
	tool?: HowToTool | Text | ReturnType<typeof HowToToolComponent>
	totalTime?: Duration | ReturnType<typeof DurationComponent>
}

type HowToDirection =
	& Thing
	& IntangibleProps
	& ListItemProps
	& CreativeWorkProps
	& HowToDirectionProps

export default HowToDirection
