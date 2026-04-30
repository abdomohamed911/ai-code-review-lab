# AI Code Review Lab

[![CI](https://github.com/abdomohamed911/ai-code-review-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/abdomohamed911/ai-code-review-lab/actions)

A curated collection of JavaScript code samples demonstrating common code quality issues and their fixes, with detailed review notes explaining the reasoning behind each improvement.

## Topics

Each topic includes a **before** file (problematic code), an **after** file (improved version), and a **review notes** document breaking down the issues and fixes.

| # | Topic | Before | After | Review Notes |
|---|-------|--------|-------|-------------|
| 01 | Async Error Handling | [`before/01-async-error-handling.js`](before/01-async-error-handling.js) | [`after/01-async-error-handling.js`](after/01-async-error-handling.js) | [`review-notes/01-async-error-handling.md`](review-notes/01-async-error-handling.md) |
| 02 | Complex Function Refactoring | [`before/02-complex-function.js`](before/02-complex-function.js) | [`after/02-complex-function.js`](after/02-complex-function.js) | [`review-notes/02-complex-function.md`](review-notes/02-complex-function.md) |
| 03 | Naming Conventions | [`before/03-naming-issues.js`](before/03-naming-issues.js) | [`after/03-naming-issues.js`](after/03-naming-issues.js) | [`review-notes/03-naming-issues.md`](review-notes/03-naming-issues.md) |
| 04 | Input Validation | [`before/04-missing-validation.js`](before/04-missing-validation.js) | [`after/04-missing-validation.js`](after/04-missing-validation.js) | [`review-notes/04-missing-validation.md`](review-notes/04-missing-validation.md) |
| 05 | Callback Hell | [`before/05-callback-hell.js`](before/05-callback-hell.js) | [`after/05-callback-hell.js`](after/05-callback-hell.js) | [`review-notes/05-callback-hell.md`](review-notes/05-callback-hell.md) |

## Quick Start

```bash
git clone https://github.com/abdomohamed911/ai-code-review-lab.git
cd ai-code-review-lab
```

Browse the `before/` and `after/` directories side by side. Each pair tells a story — start with the `before` file, try to spot the issues, then compare with the `after` version and read the corresponding review notes.

## What I Learned

Working through these examples reinforced several code review principles:

- **Error handling is not optional.** Every async function needs try-catch, every HTTP call needs status checking, and failures in non-critical paths should not crash the critical path.
- **Small functions win.** A function with cyclomatic complexity above ~10 is a code smell. Decompose into focused, single-responsibility helpers that can be tested in isolation.
- **Names reveal intent.** If you can't name a variable descriptively, the logic probably needs restructuring. Single-letter names and abbreviations save keystrokes but cost readability.
- **Validate all external input.** Trust nothing that crosses a function boundary — check types, bounds, formats, and allowed values. Fail early with clear error messages.
- **Prefer composability over nesting.** Deep callback pyramids (callback hell) are a signal to reach for async/await, Promises, or utility libraries like `util.promisify`.
- **Consistency beats cleverness.** Mixing `.then()` with `await` in the same function, or switching between coding styles mid-file, makes code harder to read and maintain.

## Repo Structure

```
ai-code-review-lab/
  before/              # Problematic code samples
  after/               # Improved versions with fixes applied
  review-notes/        # Detailed analysis of issues and improvements
  CODE_OF_CONDUCT.md
  README.md
```

## License

MIT

---

**Abdelrahman Mohamed** | [GitHub](https://github.com/abdomohamed911)
