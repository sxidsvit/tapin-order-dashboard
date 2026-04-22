# Tapin — React Technical Assessment

**Senior React Engineer (Contract) | Time limit: 60 minutes**

## Overview

This assessment is designed to take **30–60 minutes**. We're not looking for a pixel-perfect production app — we want to see how you think about component architecture, TypeScript, state management, and working with API data. Write the code you'd actually write on day one at Tapin.

## The Prompt

Build an **Order Dashboard** component in React + TypeScript that displays a live feed of venue orders. This is representative of the kind of UI you'd build at Tapin — turning backend data into a clean, functional interface for venue operators.

### API Contract

```typescript
type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'

interface Order {
  id: string
  guestName: string
  items: { name: string; quantity: number; price: number }[]
  status: OrderStatus
  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
  total: number // cents
}

// GET /api/orders?status={status}&page={n}
// Response: { orders: Order[]; total: number; page: number; pageSize: number }

// PATCH /api/orders/:id { status: OrderStatus }
// Response: Order
```

## Requirements

### Part 1 — Component Architecture (required)

- Build an `OrderDashboard` component that fetches and displays orders from the API.
- Include a filter bar that lets venue operators filter orders by status.
- Each order should display the guest name, item summary, total (formatted as dollars), time since creation, and current status.
- Include a status update action — operators should be able to advance an order to its next logical status (e.g. pending → preparing → ready → completed).
- Handle loading, empty, and error states.

### Part 2 — State & Data Flow (required)

- Use a custom hook (e.g. `useOrders`) to encapsulate data fetching, caching, and mutation logic.
- After a status update via PATCH, optimistically update the UI and handle rollback on failure.
- Demonstrate how you'd structure types to keep the component tree type-safe end to end.

### Part 3 — Pick one (choose whichever interests you)

- **Option A — Real-time**: Describe (or implement) how you'd add a WebSocket or SSE connection so the dashboard updates when new orders arrive or statuses change server-side. Sketch the hook, the reconnection strategy, and how you'd merge server events with local optimistic state.
- **Option B — Testing**: Write 2–3 meaningful tests for your `useOrders` hook or `OrderDashboard` component. Show how you'd mock the API layer and test the optimistic update + rollback flow.
- **Option C — Performance**: The venue has 500+ orders per shift. Describe (or implement) your approach to virtualization, memoization, or pagination to keep the dashboard responsive. Explain the tradeoffs you'd make.

## What We're Evaluating

- **Component design** — Are responsibilities cleanly separated? Would this be easy for another engineer to extend?
- **TypeScript usage** — Are types meaningful and precise, or just any in disguise?
- **State management** — Is the data flow clear? Does the optimistic update pattern actually work?
- **Pragmatism** — Did you make smart tradeoffs for the time constraint, or over-engineer things nobody asked for?
- **Code you'd ship** — We're reading this as if it's a real PR. Clear naming, reasonable structure, no dead code.

## Deliverables

- A GitHub repo (public or private — invite kiran-tapin if private) or a zip file containing your code.
- A brief **README** (a few paragraphs, not an essay) explaining your approach, any tradeoffs you made, and what you'd do differently with more time.
- You do **not** need to set up a backend — mock the API calls however you prefer (MSW, local JSON, hardcoded responses, etc.).

## Ground Rules

- You may use any libraries you normally reach for (React Query, Zustand, SWR, etc.) — just be ready to explain why.
- AI-assisted coding is fine (we use it too), but you should be able to walk through every line of your code in the review call.
- Don't spend more than 60 minutes. If you run out of time, leave a comment or README note about what you'd finish next — that tells us a lot too.
