# <Sitebender> Getting Started

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="start-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:hsl(120, 85%, 30%);stop-opacity:1" />
      <stop offset="100%" style="stop-color:hsl(160, 90%, 25%);stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="300" fill="url(#start-gradient)"/>
  
  <!-- Rocket launch visualization -->
  <g transform="translate(400, 180)">
    <!-- Rocket -->
    <path d="M -20,-80 L -10,-60 L -10,-20 L -15,0 L 0,10 L 15,0 L 10,-20 L 10,-60 L 20,-80 L 0,-100 Z" 
          fill="ghostwhite" stroke="snow" stroke-width="2"/>
    
    <!-- Flames -->
    <ellipse cx="0" cy="20" rx="15" ry="25" fill="hsl(20, 90%, 50%)" opacity="0.8"/>
    <ellipse cx="0" cy="25" rx="10" ry="20" fill="hsl(40, 95%, 60%)" opacity="0.9"/>
    
    <!-- Stars -->
    <circle cx="-150" cy="-50" r="2" fill="snow"/>
    <circle cx="-100" cy="-80" r="1.5" fill="snow"/>
    <circle cx="120" cy="-70" r="2" fill="snow"/>
    <circle cx="180" cy="-40" r="1.5" fill="snow"/>
    <circle cx="-180" cy="-20" r="1" fill="snow"/>
    <circle cx="150" cy="-90" r="1" fill="snow"/>
  </g>
  
  <!-- Title -->
  <text x="400" y="60" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="ghostwhite">Launch Your First App</text>
</svg>

## **TL;DR**

Build a complete todo application in Sitebender. Learn the core concepts: components as data, pure functions, triple stores, and zero runtime dependencies. By the end, you'll understand how Sitebender fundamentally changes web development.

---

## Prerequisites

Before starting, ensure you have:

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- Basic knowledge of **JSX** and **TypeScript**
- A code editor (VSCode recommended)

---

## Installation

### **1. Install Sitebender CLI**

```bash
# Install globally
npm install -g @sitebender/cli

# Verify installation
sitebender --version
# Output: Sitebender CLI v1.0.0
```

### **2. Create Your Project**

```bash
# Create new project
sitebender create todo-app

# Navigate to project
cd todo-app

# Install dependencies
npm install
```

### **3. Project Structure**

Your new project looks like this:

```
todo-app/
├── src/
│   ├── index.tsx        # Entry point
│   ├── <Sitebender>.tsx    # Root component
│   └── components/      # Your components
├── sitebender.config.ts # Configuration
├── tsconfig.json        # TypeScript config
└── package.json         # Dependencies
```

---

## Building a Todo App

### **Step 1: Define the Root Component**

Edit `src/<Sitebender>.tsx`:

```tsx
import { render } from '@sitebender/pagewright'

export const <Sitebender> = () => (
  <main className="todo-app">
    <h1>My Todo List</h1>
    <TodoList />
  </main>
)

// This becomes RDF triples:
// :Sitebender a :Component
// :Sitebender :renders :main
// :main :hasClass "todo-app"
// :main :contains :h1
// :h1 :textContent "My Todo List"
```

### **Step 2: Create the Todo List Component**

Create `src/components/TodoList.tsx`:

```tsx
import { useState } from "@sitebender/architect";

export const TodoList = () => {
  // State is stored as triples
  const [todos, setTodos] = useState([], {
    triple: ":TodoList :hasTodos ?list",
  });

  const [inputValue, setInputValue] = useState("", {
    triple: ":TodoList :hasInput ?value",
  });

  return (
    <div className="todo-list">
      <TodoInput
        value={inputValue}
        onChange={setInputValue}
        onAdd={(title) => {
          setTodos([
            ...todos,
            {
              id: Date.now(),
              title,
              completed: false,
            },
          ]);
          setInputValue("");
        }}
      />
      <TodoItems
        todos={todos}
        onToggle={(id) => {
          setTodos(
            todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
          );
        }}
        onDelete={(id) => {
          setTodos(todos.filter((todo) => todo.id !== id));
        }}
      />
      <TodoStats todos={todos} />
    </div>
  );
};
```

### **Step 3: Create the Input Component**

Create `src/components/TodoInput.tsx`:

```tsx
export const TodoInput = ({ value, onChange, onAdd }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What needs to be done?"
        className="input"
      />
      <button type="submit" className="add-btn">
        Add
      </button>
    </form>
  );
};
```

### **Step 4: Display Todo Items**

Create `src/components/TodoItems.tsx`:

```tsx
export const TodoItems = ({ todos, onToggle, onDelete }) => (
  <ul className="todo-items">
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    ))}
  </ul>
);

const TodoItem = ({ todo, onToggle, onDelete }) => (
  <li className={todo.completed ? "completed" : ""}>
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => onToggle(todo.id)}
    />
    <span className="title">{todo.title}</span>
    <button onClick={() => onDelete(todo.id)} className="delete">
      ×
    </button>
  </li>
);
```

### **Step 5: Add Statistics**

Create `src/components/TodoStats.tsx`:

```tsx
export const TodoStats = ({ todos }) => {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const remaining = total - completed;

  return (
    <div className="todo-stats">
      <span>{remaining} remaining</span>
      <span>{completed} completed</span>
      <span>{total} total</span>
    </div>
  );
};
```

---

## Understanding What Happened

### **Everything Became Triples**

Your todo app compiled to RDF:

```turtle
# Component structure
:TodoList a :Component ;
    :renders :div ;
    :hasState :todos ;
    :hasState :inputValue ;
    :contains :TodoInput, :TodoItems, :TodoStats .

# State definitions
:todos a :State ;
    :type :Array ;
    :initialValue "[]" .

:inputValue a :State ;
    :type :String ;
    :initialValue "" .

# Event bindings
:TodoInput :hasEvent [
    :type "submit" ;
    :handler :handleSubmit
] .

:checkbox :hasEvent [
    :type "change" ;
    :handler :onToggle
] .
```

### **Zero Runtime Dependencies**

Check your bundle:

```bash
# Build the app
npm run build

# Check the output
ls -lh dist/
# -rw-r--r--  1.2K index.html
# -rw-r--r--  8.3K triples.ttl
# -rw-r--r--  3.1K renderer.js  # Only YOUR code
# -rw-r--r--  0.8K styles.css
```

No React. No Vue. No framework code at all.

### **Direct DOM Manipulation**

View the generated renderer:

```javascript
// Simplified output
const todoList = document.createElement("div");
todoList.className = "todo-list";

const todos = []; // State

function render() {
  const ul = document.createElement("ul");
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";
    // ... direct DOM construction
    ul.appendChild(li);
  });
  todoList.replaceChild(ul, todoList.querySelector("ul"));
}
```

---

## Adding Advanced Features

### **Persistence with IndexedDB**

```tsx
import { persist } from "@sitebender/architect";

// Automatically syncs to IndexedDB
const [todos, setTodos] = useState([], {
  triple: ":TodoList :hasTodos ?list",
  persist: true, // Enable persistence
});

// Todos survive page refreshes
```

### **Real-time Sync**

```tsx
import { sync } from "@sitebender/syndicate";

// Enable CRDT-based sync
const [todos, setTodos] = useState([], {
  triple: ":TodoList :hasTodos ?list",
  sync: {
    url: "wss://sync.example.com",
    room: "todos-123",
  },
});

// Changes sync across all connected clients
```

### **Query Your Data**

```tsx
import { query } from "@sitebender/architect";

// Find completed todos
const completedTodos = query`
  SELECT ?todo WHERE {
    ?todo a :Todo .
    ?todo :completed true .
  }
`;

// Find todos by date
const todaysTodos = query`
  SELECT ?todo WHERE {
    ?todo a :Todo .
    ?todo :createdAt ?date .
    FILTER(?date >= "${startOfDay}")
  }
`;
```

---

## Styling Your App

### **Add Styles**

Create `src/styles.css`:

```css
.todo-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.todo-input {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid hsl(220, 85%, 35%);
  border-radius: 4px;
}

.add-btn {
  padding: 0.75rem 1.5rem;
  background: hsl(160, 85%, 30%);
  color: ghostwhite;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.todo-items {
  list-style: none;
  padding: 0;
}

.todo-items li {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid hsl(0, 0%, 90%);
}

.completed .title {
  text-decoration: line-through;
  opacity: 0.6;
}

.todo-stats {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: hsl(220, 90%, 95%);
  border-radius: 4px;
}
```

---

## Development Workflow

### **Start Development Server**

```bash
# Start with hot reload
npm run dev

# Output:
# Sitebender dev server running at http://localhost:3000
# Watching for changes...
```

### **Inspect Your Triples**

```bash
# View compiled triples
npm run inspect

# Output:
# Total triples: 847
# Components: 12
# State nodes: 3
# Event bindings: 8
```

### **Run Tests**

```bash
# Run property-based tests
npm test

# Output:
# ✓ todos are always arrays
# ✓ completed count matches filtered length
# ✓ input clears after adding
# All properties satisfied (1000 runs each)
```

---

## Debugging

### **Sitebender DevTools**

Install the browser extension for debugging:

1. Open DevTools → Sitebender tab
2. View triple store in real-time
3. Query data with SPARQL
4. Time travel through state changes

### **Query in Console**

```javascript
// Access triple store from console
sitebender.query(":TodoList :hasTodos ?list");
// → [{ id: 1, title: "Learn Sitebender", completed: true }, ...]

// Add triples directly
sitebender.add(":newTodo", ":title", "Debug this");

// Watch for changes
sitebender.watch(":todos", (newValue) => {
  console.log("Todos changed:", newValue);
});
```

---

## Deployment

### **Build for Production**

```bash
# Optimize and bundle
npm run build

# Output:
# ✓ Compiled 12 components
# ✓ Generated 847 triples
# ✓ Optimized renderer (3.1KB gzipped)
# ✓ Build complete in 1.3s
```

### **Deploy to Netlify**

```bash
# Deploy directly
npx netlify deploy --prod --dir=dist

# Or use the config
sitebender deploy
```

Your app is now live with:

- Zero framework code
- Instant loading
- Perfect Lighthouse scores
- Works offline

---

## Next Steps

### **Explore More Features**

1. **Add authentication** with Warden
2. **Implement search** with SPARQL queries
3. **Add animations** with pure CSS
4. **Enable collaboration** with CRDTs

### **Learn the Libraries**

- **Toolsmith**: Functional programming utilities
- **Architect**: Application patterns
- **Forgemaster**: Property-based testing
- **Syndicate**: Distributed sync

### **Join the Community**

- Discord: [discord.gg/sitebender](https://discord.gg/sitebender)
- GitHub: [github.com/sitebender](https://github.com/sitebender)
- Forum: [forum.sitebender.dev](https://forum.sitebender.dev)

---

## **Recap: What You Learned**

✅ **Components compile to data** (RDF triples)  
✅ **No framework runtime** shipped to users  
✅ **State lives in a triple store** you can query  
✅ **Pure functions** make everything predictable  
✅ **Direct DOM manipulation** for maximum performance

You've built your first Sitebender application! Continue to the [Developer Guide](./for-developers.md) to learn advanced patterns, or explore the [Architecture](./architecture.md) to understand how it all works under the hood.
