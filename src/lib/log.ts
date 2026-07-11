import { getCollection, render, type CollectionEntry } from 'astro:content';

export interface LogEntryWithContent {
  entry: CollectionEntry<'log'>;
  Content: Awaited<ReturnType<typeof render>>['Content'];
}

export async function getLogEntries(options?: { limit?: number }): Promise<LogEntryWithContent[]> {
  const entries = (await getCollection('log', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const sliced = options?.limit ? entries.slice(0, options.limit) : entries;

  return Promise.all(
    sliced.map(async (entry) => {
      const { Content } = await render(entry);
      return { entry, Content };
    })
  );
}
