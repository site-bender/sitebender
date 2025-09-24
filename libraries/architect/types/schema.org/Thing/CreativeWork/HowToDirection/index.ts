import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../../Intangible/index.ts"
import type HowToSupply from "../../Intangible/ListItem/HowToItem/HowToSupply/index.ts"
import type HowToTool from "../../Intangible/ListItem/HowToItem/HowToTool/index.ts"
import type { ListItemProps } from "../../Intangible/ListItem/index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type MediaObject from "../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import HowToSupplyComponent from "../../../../../../codewright/src/define/Thing/Intangible/ListItem/HowToItem/HowToSupply/index.tsx"
import HowToToolComponent from "../../../../../../codewright/src/define/Thing/Intangible/ListItem/HowToItem/HowToTool/index.tsx"
import DurationComponent from "../../../../../../codewright/src/define/Thing/Intangible/Quantity/Duration/index.tsx"
import { MediaObject as MediaObjectComponent } from "../../../../../codewright/index.tsx"

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
