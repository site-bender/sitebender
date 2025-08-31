type Props = {
  path?: string
  datatype?: "String" | "Boolean" | "Float" | "Integer" | "PlainDate" | "PlainDateTime" | "ZonedDateTime"
}

// Marker shape for compiler compatibility
type InjectorMarker = {
  __kind: "injector"
  injector: { type: "injector"; tag: string; args: Record<string, unknown> }
}

export default function FromAuthentication({ path, datatype = "String" }: Props): InjectorMarker {
  return {
    __kind: "injector",
    injector: { type: "injector", tag: "FromAuthentication", args: { path, datatype } },
  }
}
