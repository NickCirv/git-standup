#!/usr/bin/env node

import { execFileSync } from 'child_process';
import { readdirSync } from 'fs';
import { join, resolve } from 'path';

// ─── ANSI colors ────────────────────────────────────────────────────────────
const c = {
  cyan:   (s) => `\x1b[36m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  green:  (s) => `\x1b[32m${s}\x1b[0m`,
  white:  (s) => `\x1b[37m${s}\x1b[0m`,
  dim:    (s) => `\x1b[2m${s}\x1b[0m`,
  bold:   (s) => `\x1b[1m${s}\x1b[0m`,
  reset:  '\x1b[0m',
};

// ─── Relative time ──────────────────────────────────────────────────────────
function relativeTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr  = Math.floor(diffMin / 60);

  if (diffSec < 60)  return 'just now';
  if (diffMin < 60)  return `${diffMin}m ago`;
  if (diffHr  < 24)  return `${diffHr}h ago`;

  // yesterday or older — show day + time
  const isYesterday = (d) => {
    const y = new Date(now);
    y.setDate(y.getDate() - 1);
    return d.toDateString() === y.toDateString();
  };
  const timeStr = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  if (isYesterday(date)) return `yesterday ${timeStr}`;

  const dayStr = date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  return `${dayStr} ${timeStr}`;
}

// ─── Parse args ─────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = {
    since:    'yesterday',
    until:    'now',
    author:   null,
    path:     process.cwd(),
    depth:    2,
    format:   'text',
    all:      false,
    noMerges: true,
    help:     false,
  };

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    const next = args[i + 1];

    if (a === '--help' || a === '-h')         { opts.help = true; continue; }
    if (a === '--all')                         { opts.all = true; continue; }
    if (a === '--merges')                      { opts.noMerges = false; continue; }
    if ((a === '--since' || a === '-s') && next) { opts.since = next; i++; continue; }
    if ((a === '--until' || a === '-u') && next) { opts.until = next; i++; continue; }
    if ((a === '--author' || a === '-a') && next){ opts.author = next; i++; continue; }
    if ((a === '--path'   || a === '-p') && next){ opts.path = next; i++; continue; }
    if ((a === '--depth'  || a === '-d') && next){ opts.depth = parseInt(next, 10); i++; continue; }
    if ((a === '--format' || a === '-f') && next){ opts.format = next; i++; continue; }
  }

  return opts;
}

// ─── Detect git user email ───────────────────────────────────────────────────
function getGitUserEmail() {
  try {
    return execFileSync('git', ['config', '--global', 'user.email'], {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  } catch {
    return null;
  }
}

// ─── Find git repos recursively ─────────────────────────────────────────────
function findGitRepos(rootPath, maxDepth, currentDepth = 0) {
  const repos = [];
  const absRoot = resolve(rootPath.replace('~', process.env.HOME || ''));

  let entries;
  try {
    entries = readdirSync(absRoot, { withFileTypes: true });
  } catch {
    return repos;
  }

  const hasGit = entries.some((e) => e.isDirectory() && e.name === '.git');
  if (hasGit) {
    // Check it's not a bare repo
    const gitDir = join(absRoot, '.git');
    try {
      const result = execFileSync('git', ['-C', absRoot, 'rev-parse', '--is-bare-repository'], {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      }).trim();
      if (result !== 'true') repos.push(absRoot);
    } catch {
      // not a valid git repo — skip
    }
    return repos; // don't recurse into sub-repos
  }

  if (currentDepth >= maxDepth) return repos;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    repos.push(...findGitRepos(join(absRoot, entry.name), maxDepth, currentDepth + 1));
  }

  return repos;
}

// ─── Get commits from a repo ─────────────────────────────────────────────────
function getCommits(repoPath, opts) {
  const gitArgs = [
    '-C', repoPath,
    'log',
    `--since=${opts.since}`,
    `--until=${opts.until}`,
    '--format=%H%x00%h%x00%aI%x00%s%x00%ae',
  ];

  if (opts.noMerges)          gitArgs.push('--no-merges');
  if (opts.author && !opts.all) gitArgs.push(`--author=${opts.author}`);

  let raw;
  try {
    raw = execFileSync('git', gitArgs, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch {
    return [];
  }

  const lines = raw.trim().split('\n').filter(Boolean);
  return lines.map((line) => {
    const [hash, short, date, message, email] = line.split('\x00');
    return { hash, short, date, message, email };
  });
}

// ─── Format output ───────────────────────────────────────────────────────────
function formatText(repoPath, commits) {
  const label = repoPath.replace(process.env.HOME || '', '~');
  const lines = [c.bold(c.cyan(`${label} (${commits.length} commit${commits.length !== 1 ? 's' : ''})`))];
  for (const cm of commits) {
    const time = relativeTime(cm.date);
    lines.push(
      `  ${c.yellow(cm.short)} ${c.dim('·')} ${c.green(time)} ${c.dim('·')} ${c.white(cm.message)}`
    );
  }
  return lines.join('\n');
}

function formatMarkdown(repoPath, commits) {
  const label = repoPath.replace(process.env.HOME || '', '~');
  const lines = [`**${label}** (${commits.length} commit${commits.length !== 1 ? 's' : ''})`];
  for (const cm of commits) {
    const time = relativeTime(cm.date);
    lines.push(`- \`${cm.short}\` · ${time} · ${cm.message}`);
  }
  return lines.join('\n');
}

function formatJSON(results) {
  return JSON.stringify(results, null, 2);
}

// ─── Help text ───────────────────────────────────────────────────────────────
function printHelp() {
  console.log(`
${c.bold('git-standup')} — What did you work on?

${c.bold('USAGE')}
  standup [options]

${c.bold('OPTIONS')}
  --since, -s  <date>    Start of range (default: "yesterday")
  --until, -u  <date>    End of range   (default: "now")
  --author, -a <email>   Filter by author email (default: git config user.email)
  --path,   -p <dir>     Root directory to search (default: cwd)
  --depth,  -d <n>       How deep to recurse for repos (default: 2)
  --format, -f <fmt>     Output format: text | markdown | json (default: text)
  --all                  Show all authors (team standup view)
  --merges               Include merge commits (excluded by default)
  --help,   -h           Show this help

${c.bold('EXAMPLES')}
  standup                              # Yesterday's commits
  standup --since "2 days ago"        # Last 2 days
  standup --path ~/projects           # Scan ~/projects recursively
  standup --format markdown           # Slack-ready output
  standup --all                       # Everyone's commits (team view)
  standup --author nick@example.com   # Specific author
`);
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const opts = parseArgs(process.argv);

  if (opts.help) {
    printHelp();
    process.exit(0);
  }

  // Resolve author
  if (!opts.author && !opts.all) {
    opts.author = getGitUserEmail();
    if (!opts.author) {
      console.error('Could not detect git user.email. Use --author <email> or --all.');
      process.exit(1);
    }
  }

  const searchPath = opts.path.replace('~', process.env.HOME || '');
  const repos = findGitRepos(searchPath, opts.depth);

  if (repos.length === 0) {
    console.log(c.dim(`No git repos found under ${searchPath} (depth ${opts.depth})`));
    process.exit(0);
  }

  const results = [];

  for (const repoPath of repos) {
    const commits = getCommits(repoPath, opts);
    if (commits.length > 0) {
      results.push({ repo: repoPath, commits });
    }
  }

  if (results.length === 0) {
    if (opts.format === 'json') {
      console.log('[]');
    } else {
      const authorLabel = opts.all ? 'anyone' : (opts.author || 'you');
      console.log(c.dim(`Nothing committed since ${opts.since} by ${authorLabel}. Fresh start!`));
    }
    process.exit(0);
  }

  if (opts.format === 'json') {
    console.log(formatJSON(results));
  } else if (opts.format === 'markdown') {
    for (const { repo, commits } of results) {
      console.log(formatMarkdown(repo, commits));
      console.log();
    }
  } else {
    for (const { repo, commits } of results) {
      console.log(formatText(repo, commits));
      console.log();
    }
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
