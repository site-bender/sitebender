import type ConsumeAction from "../index.ts"

// ViewAction extends ConsumeAction but adds no additional properties

export default interface ViewAction extends ConsumeAction {
}
