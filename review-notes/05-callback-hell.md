# Code Review: Callback Hell → Async/Await

## Issues Identified

### Critical
1. **5 levels of nested callbacks** — The "pyramid of doom" makes the code nearly impossible to read, debug, or modify
2. **No error context** — Every callback just passes `err` back with no information about which query failed
3. **Undefined variable** — `orderIds` is referenced but never declared or populated before use

### Medium
4. **No input validation** — `userId` is not checked, so a missing or invalid ID produces a confusing SQL error
5. **Sequential execution** — All five queries run serially even though addresses, orders, and reviews are independent
6. **No JSDoc or comments** — The purpose of each query and the expected shape of the result are undocumented

### Low
7. **No result validation** — `user[0]` is accessed without checking if the array is empty (would throw)
8. **Hardcoded LIMIT** — `LIMIT 10` is a magic number with no explanation or configurability

## Improvements Made

1. **Replaced callbacks with async/await**
   - Used `util.promisify` to convert the callback-based `database.query` into a Promise-returning function
   - Eliminated all nesting — the main function is now flat and reads top-to-bottom

2. **Parallelized independent queries**
   - `getUserAddresses`, `getUserOrders`, and `getUserReviews` are independent of each other
   - Wrapped in `Promise.all()` to execute concurrently, reducing total latency

3. **Extracted focused helper functions**
   - Each query has its own named function with a single responsibility
   - Every helper is documented with JSDoc and can be tested independently

4. **Added input and result validation**
   - `getUser()` throws a clear error if the user is not found instead of silently returning `undefined`
   - `getOrderItems()` returns an empty array when there are no order IDs

5. **Fixed the undefined `orderIds` bug**
   - Order IDs are now properly derived from the fetched orders before being used

## Complexity Comparison

| Metric | Before | After |
|--------|--------|-------|
| Max nesting depth | 5 | 1 |
| Callback depth | 6 levels | 0 |
| Sequential queries | 5 | 2 (user, then order items; rest in parallel) |
| Testable functions | 1 | 6 |

## Key Learnings

- Callback hell is a structural problem, not a cosmetic one — it hides bugs (like the undefined `orderIds`)
- `Promise.all()` is the simplest way to run independent async operations concurrently
- `util.promisify` bridges the gap between callback-based APIs and modern async/await code
- Flat code with named functions is always easier to read, debug, and maintain than deeply nested anonymous callbacks
