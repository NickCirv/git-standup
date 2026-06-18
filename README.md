<div align="center">

# git-standup

**Scan all your git repos and surface yesterday's commits — ready to paste into Slack or Notion.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue?labelColor=0B0A09)](LICENSE)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?labelColor=0B0A09)](package.json)
[![Node >=18](https://img.shields.io/badge/node-%3E%3D18-brightgreen?labelColor=0B0A09)](package.json)

</div>

## Install

```bash
npx github:NickCirv/git-standup
```

## Usage

```bash
# Yesterday's commits across all repos in cwd (auto-detects git user.email)
npx github:NickCirv/git-standup

# Last 2 days, scan ~/projects, copy to Slack
npx github:NickCirv/git-standup --since "2 days ago" --path ~/projects --format markdown
```

| Flag | Alias | Default | Description |
|------|-------|---------|-------------|
| `--since` | `-s` | `"yesterday"` | Start of time range |
| `--until` | `-u` | `"now"` | End of time range |
| `--author` | `-a` | git user.email | Filter by author email |
| `--path` | `-p` | cwd | Root directory to scan |
| `--depth` | `-d` | `2` | Recursion depth for repo discovery |
| `--format` | `-f` | `text` | Output: `text`, `markdown`, `json` |
| `--all` | | false | Show all authors (team standup) |
| `--merges` | | false | Include merge commits |
| `--help` | `-h` | | Show help |

## What it does

Recursively discovers git repositories under a directory, runs `git log` for the specified time range and author, and prints a formatted summary. Text output uses ANSI colour; `markdown` produces bullet lists ready for Slack or Notion; `json` emits structured data for scripting. Auto-detects your author email from `git config user.email` so the default invocation requires no flags.

---
<sub>Zero dependencies · Node >=18 · MIT · by <a href="https://github.com/NickCirv">NickCirv</a></sub>
