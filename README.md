# git-standup

> What did you work on? Scan all repos, show your commits. Perfect for standups. Zero dependencies.

```
~/projects/my-app (3 commits)
  abc1234 · 2h ago · feat: add user authentication
  def5678 · 4h ago · fix: correct password validation
  ghi9012 · yesterday 5pm · chore: update dependencies

~/projects/api-server (1 commit)
  jkl3456 · yesterday 4pm · refactor: split auth middleware
```

## Install

```bash
# Run directly (no install needed)
npx git-standup [options]

# Or install globally
npm install -g git-standup
```

## Quick Start

```bash
# Show your commits from yesterday (detects git config user.email automatically)
standup

# Last 2 days
standup --since "2 days ago"

# Scan a specific directory
standup --path ~/projects

# Copy to Slack / Notion
standup --format markdown

# Team standup — all authors
standup --all
```

## Options

| Flag | Alias | Default | Description |
|------|-------|---------|-------------|
| `--since` | `-s` | `"yesterday"` | Start of time range |
| `--until` | `-u` | `"now"` | End of time range |
| `--author` | `-a` | git user.email | Filter by author email |
| `--path` | `-p` | current dir | Root directory to scan for repos |
| `--depth` | `-d` | `2` | How deep to recurse looking for repos |
| `--format` | `-f` | `text` | Output format: `text`, `markdown`, `json` |
| `--all` | | `false` | Show all authors (team view) |
| `--merges` | | `false` | Include merge commits |
| `--help` | `-h` | | Show help |

## Output Formats

**text** — ANSI colors, great for terminal

**markdown** — Great for Slack, Notion, GitHub comments

```markdown
**~/projects/my-app** (3 commits)
- `abc1234` · 2h ago · feat: add user authentication
- `def5678` · 4h ago · fix: correct password validation
```

**json** — Machine-readable, pipe it anywhere

```json
[
  {
    "repo": "/Users/nick/projects/my-app",
    "commits": [
      { "hash": "abc1234...", "short": "abc1234", "date": "2025-01-15T10:00:00Z", "message": "feat: add user auth", "email": "nick@example.com" }
    ]
  }
]
```

## Examples

```bash
# Yesterday's work (default)
standup

# Last week
standup --since "1 week ago"

# Specific author
standup --author nick@example.com

# Scan ~/projects, go 3 levels deep
standup --path ~/projects --depth 3

# Markdown for Slack
standup --format markdown | pbcopy

# JSON for scripting
standup --format json | jq '.[].repo'

# Team view (all authors)
standup --all --since "today"
```

## Why?

Every morning: "What did I work on yesterday?" Staring at a blank standup form while Git holds all the answers.

`git-standup` scans all your repos, finds your commits, and surfaces them in seconds. Copy to Slack in markdown, parse as JSON in a script, or just read it in your terminal.

Zero dependencies. Pure Node.js built-ins only. Works anywhere Node 18+ runs.

---

Built with Node.js · Zero dependencies · MIT License
