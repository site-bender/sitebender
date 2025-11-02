import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

export type WPSideBarType = "WPSideBar"

export interface WPSideBarProps {
	"@type"?: WPSideBarType
}

type WPSideBar =
	& Thing
	& CreativeWorkProps
	& WebPageElementProps
	& WPSideBarProps

export default WPSideBar
