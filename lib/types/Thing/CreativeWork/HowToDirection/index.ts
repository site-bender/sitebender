import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../../Intangible/index.ts"
import type { ListItemProps } from "../../Intangible/ListItem/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type HowToSupply from "../../Intangible/ListItem/HowToItem/HowToSupply/index.ts"
import type HowToTool from "../../Intangible/ListItem/HowToItem/HowToTool/index.ts"
import type MediaObject from "../../MediaObject/index.ts"

import HowToDirectionComponent from "../../../../../components/Thing/CreativeWork/HowToDirection/index.tsx"

export interface HowToDirectionProps {
	afterMedia?: MediaObject | URL
	beforeMedia?: MediaObject | URL
	duringMedia?: MediaObject | URL
	performTime?: Duration
	prepTime?: Duration
	supply?: HowToSupply | Text
	tool?: HowToTool | Text
	totalTime?: Duration
}

type HowToDirection =
	& Thing
	& IntangibleProps
	& ListItemProps
	& CreativeWorkProps
	& HowToDirectionProps

export default HowToDirection
