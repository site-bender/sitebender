import ConsumeAction from "../index.ts"

// ListenAction extends ConsumeAction but adds no additional properties

export default interface ListenAction extends ConsumeAction {
}
