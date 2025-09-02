# Build your first Adaptive page (MVP)

This guide is for developers who know basic HTML and want to add interactive behavior without a framework. You’ll use the Adaptive IR (a tiny JSON DSL) plus a small hydrator to wire DOM events to actions.

You don’t need to learn a new component model. You keep writing HTML. Adaptive attaches behaviors via a minimal JSON “IR” block embedded in the page.

## What you’ll build

- Live input mirroring (type → updates another element)
- Form submit that updates the URL query string (with navigation prevented)
- Simple validation using a conditional action
- A tiny arithmetic example (add two fields)

All examples use only the current MVP features that ship with the defaults.

## Concepts in 60 seconds

- IR: A JSON script that describes behaviors (events + actions). You embed it as a `<script type="application/adaptive+json">` block.
- Anchors: Each behavior node has an `id`. Adaptive binds it to a real element by matching `data-ir-id="<id>"` (or falling back to `id="<id>"`).
- Hydration: A small runtime scans the IR and attaches event listeners.
- Events: `On.Input`, `On.Change`, `On.Blur`, `On.Submit`.
- Actions: `Act.SetValue`, `Act.Submit`, `Act.SetQueryString`, `Act.Publish`, `Act.If`.
- Injectors: How actions get values, e.g. `From.Constant`, `From.Element`, `From.QueryString`, `From.LocalStorage`.
- Comparators: Boolean checks, e.g. `Is.NotEmpty`, `Is.NoLongerThan`, `Is.EqualTo`, `Is.Not`, `Is.And`.
- Operators: Numeric ops you can compose, e.g. `Op.Add`, `Op.Multiply`.

## Minimal page template

Below is a single HTML page that includes:

- Your HTML elements with `data-ir-id` anchors
- One IR script (`id="ir-root"`)
- A tiny module that imports the hydrator and registers the default executors

Note: In this monorepo, imports are shown as relative to the library. In your app, import from your installed package alias.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Adaptive MVP Tutorial</title>
  </head>
  <body>
    <h1>Adaptive MVP</h1>

    <!-- Example 1: Live mirror -->
  <label for="name">Your name</label>
  <input id="name" data-ir-id="name" />
    <p>Hello, <span id="out">(none)</span></p>
  <!-- The input carries the anchor for input/validation behaviors -->

    <!-- Example 2: Submit updates query string -->
  <form id="profile" data-ir-id="profile" action="/ignored-by-adaptive">
      <input name="favorite" id="favorite" placeholder="Favorite thing" />
      <button type="submit">Save</button>
    </form>

    <!-- Example 3: Simple validation message -->
  <p id="msg" aria-live="polite"></p>

    <!-- Example 4: Add two numbers -->
  <input id="a" data-ir-id="a" inputmode="numeric" placeholder="A" />
  <input id="b" data-ir-id="b" inputmode="numeric" placeholder="B" />
    = <span id="sum">0</span>

    <!-- 1) Adaptive IR: place all behaviors in one script -->
    <script id="ir-root" type="application/adaptive+json">
    {
      "v": "0.1.0",
      "kind": "element",
      "id": "root",
      "tag": "div",
      "attrs": {},
      "children": [
        {
          "v": "0.1.0",
          "kind": "on",
          "id": "name",
          "event": "On.Input",
          "handler": {
            "v": "0.1.0",
            "kind": "action",
            "id": "mirror_1",
            "action": "Act.SetValue",
            "args": [
              { "v":"0.1.0", "kind":"injector", "id":"sel_out", "injector":"From.Constant", "datatype":"String", "args": { "value": "#out" } },
              { "v":"0.1.0", "kind":"injector", "id":"val_name", "injector":"From.Element", "datatype":"String", "args": { "selector": "#name" } }
            ]
          }
        },

        {
          "v": "0.1.0",
          "kind": "on",
          "id": "profile",
          "event": "On.Submit",
          "handler": {
            "v": "0.1.0",
            "kind": "action",
            "id": "submit_qs",
            "action": "Act.SetQueryString",
            "args": [
              { "v":"0.1.0", "kind":"injector", "id":"qs_key", "injector":"From.Constant", "datatype":"String", "args": { "value": "favorite" } },
              { "v":"0.1.0", "kind":"injector", "id":"qs_val", "injector":"From.Element", "datatype":"String", "args": { "selector": "#favorite" } }
            ]
          }
        },

        {
          "v": "0.1.0",
          "kind": "on",
          "id": "name",
          "event": "On.Blur",
          "handler": {
            "v": "0.1.0",
            "kind": "action",
            "id": "validate_name",
            "action": "Act.If",
            "args": [
              { "v":"0.1.0", "kind":"comparator", "id":"c_not_empty", "cmp":"Is.NotEmpty", "args": [
                { "v":"0.1.0", "kind":"injector", "id":"val_name2", "injector":"From.Element", "datatype":"String", "args": { "selector": "#name" } }
              ] },
              { "v":"0.1.0", "kind":"action", "id":"ok_msg", "action":"Act.SetValue", "args": [
                { "v":"0.1.0", "kind":"injector", "id":"sel_msg", "injector":"From.Constant", "datatype":"String", "args": { "value": "#msg" } },
                { "v":"0.1.0", "kind":"injector", "id":"msg_ok", "injector":"From.Constant", "datatype":"String", "args": { "value": "Looks good." } }
              ] },
              { "v":"0.1.0", "kind":"action", "id":"err_msg", "action":"Act.SetValue", "args": [
                { "v":"0.1.0", "kind":"injector", "id":"sel_msg2", "injector":"From.Constant", "datatype":"String", "args": { "value": "#msg" } },
                { "v":"0.1.0", "kind":"injector", "id":"msg_err", "injector":"From.Constant", "datatype":"String", "args": { "value": "Name is required." } }
              ] }
            ]
          }
        },

        {
          "v": "0.1.0",
          "kind": "on",
          "id": "a",
          "event": "On.Input",
          "handler": {
            "v": "0.1.0",
            "kind": "action",
            "id": "sum_set",
            "action": "Act.SetValue",
            "args": [
              { "v":"0.1.0", "kind":"injector", "id":"sel_sum", "injector":"From.Constant", "datatype":"String", "args": { "value": "#sum" } },
              { "v":"0.1.0", "kind":"operator", "id":"sum_op", "op":"Op.Add", "datatype":"Float", "args": [
                { "v":"0.1.0", "kind":"injector", "id":"a_val", "injector":"From.Element", "datatype":"Float", "args": { "selector": "#a" } },
                { "v":"0.1.0", "kind":"injector", "id":"b_val", "injector":"From.Element", "datatype":"Float", "args": { "selector": "#b" } }
              ] }
            ]
          }
        },
        {
          "v": "0.1.0",
          "kind": "on",
          "id": "b",
          "event": "On.Input",
          "handler": {
            "v": "0.1.0",
            "kind": "action",
            "id": "sum_set_b",
            "action": "Act.SetValue",
            "args": [
              { "v":"0.1.0", "kind":"injector", "id":"sel_sum_b", "injector":"From.Constant", "datatype":"String", "args": { "value": "#sum" } },
              { "v":"0.1.0", "kind":"operator", "id":"sum_op_b", "op":"Op.Add", "datatype":"Float", "args": [
                { "v":"0.1.0", "kind":"injector", "id":"a_val_b", "injector":"From.Element", "datatype":"Float", "args": { "selector": "#a" } },
                { "v":"0.1.0", "kind":"injector", "id":"b_val_b", "injector":"From.Element", "datatype":"Float", "args": { "selector": "#b" } }
              ] }
            ]
          }
        }
      ]
    }
    </script>

    <!-- 2) Hydrate: attach behaviors on the client -->
    <script type="module">
      import hydrate from "/libraries/engine/src/runtime/hydrator/index.ts";
      const script = document.getElementById("ir-root");
      const ir = script?.textContent ? JSON.parse(script.textContent) : null;
      if (ir) hydrate(ir);
    </script>
  </body>
</html>
```

### Why no page navigation on submit?

`On.Submit` automatically calls `preventDefault()` so your actions decide what happens (e.g., update the URL via `Act.SetQueryString`). You keep full control.

## Authoring tips

- Anchors: Put `data-ir-id` on the element you want the event to bind to (or on a nearby wrapper). It can also match by `id`, but `data-ir-id` is preferred.
- Selectors: Injectors like `From.Element` expect a valid CSS selector in `args.selector`.
- Stringifying values: Actions like `Act.SetValue` coerce values to strings for text nodes; for inputs with a `value` property, the `value` gets set.
- URL updates: `Act.SetQueryString` uses `history.replaceState` to avoid full navigation.
- Validation: Use `Act.If` with comparators (`Is.NotEmpty`, `Is.NoLongerThan`, etc.) to branch between actions.

## What’s registered by default

The helper `registerDefaultExecutors` wires up:

- Injectors: `From.Constant`, `From.Element`, `From.QueryString`, `From.LocalStorage`
- Operators: `Op.Add`, `Op.Multiply`
- Comparators: `Is.And`, `Is.NoShorterThan`, `Is.NoLongerThan`, `Is.NotEmpty`, `Is.EmailAddress`, `Is.EqualTo`, `Is.Not`
- Events: `On.Input`, `On.Change`, `On.Blur`, `On.Submit` (with preventDefault)
- Actions: `Act.SetValue`, `Act.Submit`, `Act.SetQueryString`, `Act.Publish`, `Act.If`

## Troubleshooting

- Nothing happens: Ensure your IR script exists, is valid JSON, and has `id="ir-root"` (or update your load code accordingly).
- Event not binding: Check `data-ir-id` on the target element matches the `id` of the IR `kind: "on"` node.
- Selector not found: `From.Element` selectors must resolve to an element with either `textContent` or `value`.
- Submit still navigating: Ensure you used `On.Submit` (Adaptive’s binder prevents navigation for you).

## Optional: compose multiple behaviors

You can add multiple `kind: "on"` nodes to the same page and bind them to different elements by giving each a unique `id` and placing `data-ir-id` next to the target.

---

That’s it. Keep writing HTML, describe behaviors in the IR, and let the hydrator do the wiring.
