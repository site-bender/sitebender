import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageElementProps } from "../index.ts"

import WPSideBarComponent from "../../../../../../components/Thing/CreativeWork/WebPageElement/WPSideBar/index.tsx"

export interface WPSideBarProps {
}

type WPSideBar =
	& Thing
	& CreativeWorkProps
	& WebPageElementProps
	& WPSideBarProps

export default WPSideBar
