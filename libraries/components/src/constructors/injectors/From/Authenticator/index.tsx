type Props = {
  path?: string
  datatype?: "String" | "Boolean" | "Float" | "Integer" | "PlainDate" | "PlainDateTime" | "ZonedDateTime"
}

// Return a constructor-like marker the compiler lowers to IR
export default function FromAuthenticator({ path, datatype = "String" }: Props) {
  return { type: "injector", tag: "FromAuthenticator", datatype, path }
}
