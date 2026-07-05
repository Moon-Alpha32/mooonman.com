import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['live', 'wip', 'archived']),
    date: z.coerce.date(),
    tags: z.array(z.string()).max(4),
    url: z.string().optional(),
    repo: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
