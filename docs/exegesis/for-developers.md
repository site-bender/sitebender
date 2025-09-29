# <Sitebender> Developer Guide

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="dev-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:hsl(160, 85%, 30%);stop-opacity:1" />
      <stop offset="100%" style="stop-color:hsl(200, 90%, 25%);stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="300" fill="url(#dev-gradient)"/>
  
  <!-- Code elements visualization -->
  <g transform="translate(100, 150)">
    <!-- Code brackets -->
    <text x="0" y="0" font-family="monospace" font-size="60" fill="snow" opacity="0.3">&lt;</text>
    <text x="600" y="0" font-family="monospace" font-size="60" fill="snow" opacity="0.3">/&gt;</text>
    
    <!-- Central elements -->
    <rect x="200" y="-40" width="200" height="80" fill="hsl(280, 85%, 35%)" stroke="snow" stroke-width="2" rx="5" opacity="0.9"/>
    <text x="300" y="10" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="ghostwhite" font-weight="bold">Develop</text>
  </g>
  
  <!-- Title -->
  <text x="400" y="60" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="ghostwhite">Build with Sitebender</text>
</svg>

## **TL;DR**

This guide shows you how to build production applications with Sitebender. Learn the patterns, best practices, and techniques for developing applications where everything is data, functions are pure, and there are zero runtime dependencies.

---

## Core Development Patterns

### **Component Structure**

In Sitebender, components are pure functions that return JSX:

```tsx
// Define your root component
export const <Sitebender> = () => (
  <main className="app">
    <Header />
    <Router />
    <Footer />
  </main>
)

// Child components follow the same pattern
const Header = () => (
  <header>
    <nav>
      <Logo />
      <Navigation items={menuItems} />
      <UserMenu />
    </nav>
  </header>
)
```

### **State Management**

State in Sitebender is just data in the triple store:

```tsx
// Declare state with semantic meaning
const Counter = () => {
  const [count, setCount] = useState(0, {
    triple: ":Counter :hasCount ?value",
  });

  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// Query state from anywhere
const GlobalCount = () => {
  const count = useQuery(":Counter :hasCount ?value");
  return <span>Global count: {count}</span>;
};
```

### **Pure Functions Only**

Every function must be pure - no side effects:

```tsx
// ❌ Impure - has side effects
function fetchUser(id: string) {
  return fetch(`/api/users/${id}`).then((res) => res.json());
}

// ✅ Pure - returns effect description
function fetchUser(id: string) {
  return {
    type: "EFFECT",
    action: "FETCH",
    url: `/api/users/${id}`,
    decoder: UserDecoder,
  };
}

// Effects are handled by the runtime
const UserProfile = ({ userId }) => {
  const user = useEffect(fetchUser(userId));
  return user ? <Profile {...user} /> : <Loading />;
};
```

---

## Working with Triples

### **Understanding RDF**

Every piece of your application becomes an RDF triple:

```turtle
# Component definition
:TodoList a :Component ;
    :renders :div ;
    :hasState :todos ;
    :hasMethod :addTodo ;
    :hasMethod :removeTodo .

# State definition
:todos a :State ;
    :type :Array ;
    :itemType :Todo ;
    :initialValue "[]" .

# Style binding
:TodoList :hasStyle [
    :property "padding" ;
    :value "1rem" ;
] .
```

### **Querying Data**

Use SPARQL or Sitebender's query DSL:

```tsx
// SPARQL query
const todosQuery = sparql`
  SELECT ?todo ?title ?completed WHERE {
    ?todo a :Todo .
    ?todo :title ?title .
    ?todo :completed ?completed .
  }
`;

// Sitebender DSL
const todos = query<Todo>()
  .match(":Todo")
  .where(":completed", false)
  .select(["title", "createdAt"]);

// Use in components
const TodoList = () => {
  const todos = useQuery(todosQuery);
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};
```

### **Modifying Triples**

All modifications go through the store:

```tsx
// Add a triple
store.add(":newTodo", ":title", "Buy groceries");
store.add(":newTodo", ":completed", false);

// Remove a triple
store.remove(":oldTodo", ":completed", true);

// Update (remove + add)
store.update(":todo1", ":title", "Updated title");

// Batch operations
store.transaction(() => {
  store.add(":todo1", ":completed", true);
  store.add(":todo1", ":completedAt", Date.now());
  store.remove(":todoList", ":activeCount", 3);
  store.add(":todoList", ":activeCount", 2);
});
```

---

## Sitebender Libraries

### **Toolsmith - Functional Utilities**

Over 1000 pure functions for data manipulation:

```tsx
import { pipe, map, filter, reduce } from "@sitebender/toolsmith";

// Compose operations
const processItems = pipe(
  filter((item) => item.active),
  map((item) => ({ ...item, processed: true })),
  reduce((acc, item) => acc + item.value, 0),
);

// Use in components
const Summary = ({ items }) => {
  const total = processItems(items);
  return <div>Total: {total}</div>;
};
```

### **Pagewright - HTML Generation**

Semantic HTML/SVG builders:

```tsx
import { div, h1, ul, li } from "@sitebender/pagewright";

// Programmatic HTML creation
const list = ul(
  { className: "todo-list" },
  todos.map((todo) => li({ key: todo.id }, todo.title)),
);

// SVG generation
const chart = svg({
  viewBox: "0 0 100 100",
  children: [
    circle({ cx: 50, cy: 50, r: 40, fill: "blue" }),
    text({ x: 50, y: 50 }, value),
  ],
});
```

### **Architect - Application Patterns**

Pre-built architectural patterns:

```tsx
import { createApp, Router, Store } from '@sitebender/architect'

const app = createApp({
  root: <Sitebender>,
  store: new Store({
    persistence: 'indexeddb',
    sync: 'crdt'
  }),
  router: new Router({
    routes: {
      '/': HomePage,
      '/users/:id': UserProfile,
      '/settings': Settings
    }
  })
})
```

### **Warden - Security**

Cryptographic capabilities and access control:

```tsx
import { capability, verify } from "@sitebender/warden";

// Create capability
const cap = capability({
  resource: ":UserProfile",
  operations: ["read", "update"],
  expiry: Date.now() + 3600000,
});

// Verify before access
const UserProfile = ({ userId }) => {
  const canRead = verify(cap, "read", ":UserProfile");

  if (!canRead) {
    return <AccessDenied />;
  }

  return <Profile userId={userId} />;
};
```

---

## Advanced Patterns

### **Lazy Loading Components**

Components load on demand from the triple store:

```tsx
// Define lazy boundary
const LazyDashboard = lazy(":Dashboard");

// Component loads when needed
const App = () => (
  <Router>
    <Route path="/dashboard">
      <Suspense fallback={<Loading />}>
        <LazyDashboard />
      </Suspense>
    </Route>
  </Router>
);
```

### **Optimistic Updates**

Update UI before server confirmation:

```tsx
const TodoItem = ({ todo }) => {
  const [optimistic, setOptimistic] = useOptimistic();

  const toggle = () => {
    // Update immediately
    setOptimistic({ completed: !todo.completed });

    // Sync with server
    sync({
      triple: [todo.id, ":completed", !todo.completed],
      onError: () => setOptimistic(null), // Rollback
    });
  };

  const completed = optimistic?.completed ?? todo.completed;

  return (
    <div className={completed ? "done" : ""}>
      <input type="checkbox" checked={completed} onChange={toggle} />
      {todo.title}
    </div>
  );
};
```

### **Real-time Collaboration**

Built-in CRDT support for collaboration:

```tsx
const CollaborativeEditor = () => {
  const [content, setContent] = useCRDT(":document");
  const presence = usePresence(":document");

  return (
    <div>
      <UserCursors users={presence} />
      <Editor value={content} onChange={setContent} />
      <ActiveUsers users={presence} />
    </div>
  );
};
```

### **Time Travel Debugging**

Navigate through application history:

```tsx
const DevTools = () => {
  const history = useHistory();
  const [index, setIndex] = useState(history.length - 1);

  return (
    <div className="devtools">
      <input
        type="range"
        min={0}
        max={history.length - 1}
        value={index}
        onChange={(e) => {
          setIndex(e.target.value);
          store.restore(history[e.target.value]);
        }}
      />
      <HistoryView snapshot={history[index]} />
    </div>
  );
};
```

---

## Testing Strategies

### **Property-Based Testing**

Use Forgemaster for exhaustive testing:

```tsx
import { property, forAll } from "@sitebender/forgemaster";

// Test invariants
property(
  "todos are always arrays",
  forAll(appStates, (state) => Array.isArray(state.todos)),
);

property(
  "count matches todos length",
  forAll(appStates, (state) => state.count === state.todos.length),
);
```

### **Triple Assertions**

Test your data directly:

```tsx
test("adding todo creates correct triples", () => {
  const store = new Store();

  addTodo(store, "Test todo");

  expect(store.query(":Todo")).toHaveLength(1);
  expect(store.get("?todo", ":title", "Test todo")).toBeTruthy();
  expect(store.get("?todo", ":completed", false)).toBeTruthy();
});
```

### **Snapshot Testing**

Capture complete application state:

```tsx
test('app renders correctly', () => {
  const app = render(<Sitebender>)
  const snapshot = store.serialize()

  expect(snapshot).toMatchSnapshot()
})
```

---

## Performance Optimization

### **Query Optimization**

Optimize your SPARQL queries:

```tsx
// ❌ Inefficient - multiple queries
const user = query(":user123 :name ?name");
const email = query(":user123 :email ?email");
const role = query(":user123 :role ?role");

// ✅ Efficient - single query
const userData = query`
  SELECT ?name ?email ?role WHERE {
    :user123 :name ?name ;
             :email ?email ;
             :role ?role .
  }
`;
```

### **Triple Indexing**

Create indexes for frequent queries:

```tsx
// Define indexes at compile time
export const indexes = {
  userByEmail: ":User :email ?email",
  todosByUser: ":Todo :owner ?user",
  completedTodos: ":Todo :completed true",
};

// Queries use indexes automatically
const user = query(indexes.userByEmail, "user@example.com");
```

### **Bundle Splitting**

Split application into semantic chunks:

```tsx
// Split by domain
const bundles = {
  core: [":App", ":Router", ":Layout"],
  user: [":User", ":Profile", ":Settings"],
  admin: [":Admin", ":Dashboard", ":Reports"],
};

// Load on demand
const AdminPanel = () => {
  useBundle("admin");
  return <Dashboard />;
};
```

---

## Deployment

### **Build Configuration**

Configure your build in `sitebender.config.ts`:

```typescript
export default {
  input: "src/index.tsx",
  output: "dist",

  compiler: {
    target: "es2020",
    optimize: true,
    treeshake: true,
  },

  triples: {
    format: "turtle",
    compress: true,
    split: true,
  },

  deploy: {
    type: "static",
    provider: "netlify",
  },
};
```

### **Production Build**

```bash
# Build for production
sitebender build --production

# Output
dist/
├── index.html       # Entry point
├── triples.ttl.gz   # Compressed triples
├── renderer.js      # Minimal renderer
└── assets/          # Static assets
```

### **Environment Configuration**

```typescript
// Environment-specific triples
const config = {
  development: {
    ":api": "http://localhost:3000",
  },
  production: {
    ":api": "https://api.example.com",
  },
};

// Use in application
const endpoint = query(":api");
```

---

## **Recap: Development Best Practices**

**Think in triples**: Model your domain as semantic relationships  
**Keep it pure**: No side effects in your functions  
**Query don't fetch**: Use SPARQL instead of REST APIs  
**Compose libraries**: Combine Sitebender's 15 libraries  
**Test properties**: Verify invariants, not just examples  
**Optimize queries**: Index frequently accessed patterns

Building with Sitebender requires thinking differently about web development. Embrace the semantic web, and you'll build applications that are more correct, more composable, and more powerful than traditional approaches allow.
