const cache = new Map<string, Promise<string | null>>();

async function fetchStats(repo: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'mooonman.com-build',
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) return null;

    const data = await res.json();
    const parts: string[] = [];

    if (typeof data.stargazers_count === 'number') {
      parts.push(`★ ${data.stargazers_count}`);
    }
    if (typeof data.language === 'string' && data.language) {
      parts.push(data.language);
    }
    if (typeof data.pushed_at === 'string') {
      const formatted = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'long',
      }).format(new Date(data.pushed_at));
      parts.push(`updated ${formatted}`);
    }

    return parts.length > 0 ? parts.join(' · ') : null;
  } catch (err) {
    console.warn(`[github stats] failed to fetch ${repo}:`, err);
    return null;
  }
}

export function getRepoStats(repo?: string): Promise<string | null> {
  if (!repo) return Promise.resolve(null);

  if (!cache.has(repo)) {
    cache.set(repo, fetchStats(repo));
  }

  return cache.get(repo)!;
}
