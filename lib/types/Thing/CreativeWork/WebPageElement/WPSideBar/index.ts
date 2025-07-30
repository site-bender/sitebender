import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

export interface WPSideBarProps {
	"@type"?: "WPSideBar"}

type WPSideBar =
	& Thing
	& CreativeWorkProps
	& WebPageElementProps
	& WPSideBarProps

export default WPSideBar
