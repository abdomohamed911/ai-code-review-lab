# AI Code Review Lab

A research and engineering environment for building, evaluating, and refining AI-powered code review systems. This project provides the infrastructure for automated code quality assessment using large language models, including prompt engineering, evaluation frameworks, and configurable review workflows.

## Overview

AI Code Review Lab treats code review as an engineering problem rather than a black-box AI application. The system decomposes the review process into discrete stages -- context extraction, rule-based analysis, LLM evaluation, and report generation -- each of which can be independently configured, tested, and improved.

The lab includes a curated set of evaluation prompts, scoring rubrics, and benchmark cases that make it possible to measure review accuracy, consistency, and actionability across different models and configurations. This structured approach enables systematic improvement of AI-assisted code review quality over time.

## Features

- **Modular Review Pipeline** -- Composable stages that can be rearranged, replaced, or extended without modifying the core engine
- **Prompt Engineering Toolkit** -- Versioned prompt templates for different review dimensions (correctness, performance, security, readability, maintainability)
- **Evaluation Framework** -- Scoring rubrics and benchmark datasets that quantify review quality across multiple axes
- **Multi-Model Support** -- Pluggable LLM integrations enabling comparison across different models and providers
- **Context-Aware Analysis** -- Extracts relevant code context, dependency information, and project conventions before submitting code for review
- **Review Workflows** -- Predefined workflows for different use cases: pull request review, security audit, performance optimization, and general quality assessment
- **Structured Output** -- Reviews are generated as typed, machine-readable objects with severity levels, file locations, and specific recommendations
- **Configuration System** -- YAML-based configuration for rules, thresholds, model parameters, and workflow definitions
- **Benchmark Runner** -- Automated benchmark execution that evaluates review accuracy against curated test cases with known issues

## Tech Stack

| Category | Technology |
|---|---|
| Language | JavaScript, TypeScript |
| Runtime | Node.js |
| LLM Integration | OpenAI API, configurable provider interface |
| Prompt Management | Versioned template system |
| Evaluation | Custom scoring framework with rubric definitions |
| Configuration | YAML |
| Testing | Jest with benchmark fixtures |

## Architecture

```
ai-code-review-lab/
  src/
    core/               # Review engine and pipeline orchestration
      pipeline/         # Composable review stages
      evaluator/        # LLM interaction and response parsing
      scorer/           # Evaluation scoring logic
    prompts/            # Versioned prompt templates organized by review dimension
      correctness/
      performance/
      security/
      readability/
      maintainability/
    workflows/          # Predefined review workflow configurations
    benchmarks/         # Benchmark cases, expected outputs, and scoring rubrics
    config/             # Configuration schema and loader
    utils/              # Code parsing, context extraction, file utilities
    types/              # Shared TypeScript type definitions
  tests/                # Unit tests, integration tests, and benchmark suites
  configs/              # Example configuration files
  benchmarks/           # Benchmark datasets and expected results
```

**Review Pipeline:**

1. **Context Extraction** -- The target code is parsed, and relevant context (surrounding functions, imports, type definitions) is collected
2. **Pre-Analysis** -- Rule-based checks run first to identify clear violations and reduce redundant LLM calls
3. **LLM Evaluation** -- Code and context are submitted to the configured model with dimension-specific prompts
4. **Response Parsing** -- LLM responses are parsed into structured review objects with standardized fields
5. **Scoring** -- Each finding is scored against the evaluation rubric for severity, accuracy, and actionability
6. **Report Generation** -- Findings are aggregated and formatted into the requested output format

## Review Dimensions

The system evaluates code across five independent dimensions:

| Dimension | What It Evaluates |
|---|---|
| Correctness | Logic errors, edge cases, type mismatches, null/undefined handling |
| Performance | Unnecessary computation, memory leaks, inefficient algorithms, blocking operations |
| Security | Injection vulnerabilities, exposed secrets, insufficient input validation, unsafe dependencies |
| Readability | Naming conventions, function length, control flow complexity, comment quality |
| Maintainability | Coupling, cohesion, testability, adherence to SOLID principles, code duplication |

Each dimension has its own prompt template, scoring rubric, and set of benchmark test cases.

## Getting Started

### Prerequisites

- Node.js 18 or later
- Access to an LLM API (OpenAI or compatible provider)

### Environment Variables

Create a `.env` file in the project root:

```
LLM_PROVIDER=openai
LLM_API_KEY=your_api_key
LLM_MODEL=gpt-4
```

### Installation

```bash
git clone https://github.com/abdomohamed911/ai-code-review-lab.git
cd ai-code-review-lab
npm install
```

### Run a Code Review

```bash
# Review a single file
npx ai-review ./src/example.ts

# Review a directory with a specific workflow
npx ai-review ./src --workflow security-audit

# Review with a custom config
npx ai-review ./src --config ./configs/review-config.yaml
```

### Run Benchmarks

```bash
# Execute all benchmarks
npx ai-review-benchmark

# Run benchmarks for a specific dimension
npx ai-review-benchmark --dimension correctness

# Compare two model configurations
npx ai-review-benchmark --compare config-a.yaml config-b.yaml
```

### Configuration

```yaml
review:
  workflow: general-review
  dimensions:
    - correctness
    - performance
    - security
    - readability
    - maintainability
  thresholds:
    error_severity: 0.7
    warn_severity: 0.4

model:
  provider: openai
  model: gpt-4
  temperature: 0.1
  max_tokens: 4096

output:
  format: markdown
  include_code_snippets: true
```

## License

MIT

---

**Abdelrahman Mohamed** | [GitHub](https://github.com/abdomohamed911)
