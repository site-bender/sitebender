# Parsing math equations as calculation shortcut

Our system of using JSX for declarative calculations is wonderful and extremely powerful, but can be quite verbose. Consider this example:

```tsx
<Calculate>
  <Add>
    <Divide type="Integer">
      <Dividend>
        <From.Constant type="Integer">99</From.Constant>
      </Dividend>
      <Divisor>
        <From.Element id="divisor" type="Integer" />{" "}
        {/* Can use any injector */}
      </Divisor>
    </Divide>
    <Divide type="Integer">
      <Dividend>
        <From.Constant type="Integer">44</From.Constant>
      </Dividend>
      <Divisor>
        <From.Constant type="Integer">2</From.Constant>
      </Divisor>
    </Divide>
  </Add>
</Calculate>
```

I want to be able to rewrite this (optionally) using a more concise syntax, such as:

```tsx
<Calculate formula="(a / b) + (c / d)">
  <Variable name="a" type="Integer">
    <From.Constant>99</From.Constant>
  </Variable>
  <Variable name="b" type="Integer">
    <From.Element id="divisor" type="Integer" />
  </Variable>
  <Variable name="c" type="Integer">
    <From.Constant>44</From.Constant>
  </Variable>
  <Variable name="d" type="Integer">
    <From.Constant>2</From.Constant>
  </Variable>
</Calculate>
```

## How it works

The parser transforms formula strings into engine configuration objects:

1. **Formula string** is tokenized and parsed into an AST
2. **Variables are replaced** with their injector configurations
3. **Engine constructors** are called to build the final config
4. **Result** is identical to verbose JSX version

### Example transformation

Input:
```tsx
parseFormula(
  "(a / b) + (c / d)",
  {
    a: { tag: "Constant", type: "injector", datatype: "Integer", value: 99 },
    b: { tag: "FromElement", type: "injector", datatype: "Integer", source: "#divisor" },
    c: { tag: "Constant", type: "injector", datatype: "Integer", value: 44 },
    d: { tag: "Constant", type: "injector", datatype: "Integer", value: 2 }
  }
)
```

Output: Engine configuration identical to the verbose JSX approach.

## Implementation

Pure functional TypeScript using:
- Pratt parser with precedence climbing
- Result/Either for error handling
- Existing engine constructors (no reinvention)
- Behavior-driven testing approach

See `agenda/plans/parsing-math.md` for implementation details.
