import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    shown: z.boolean(),
  }),
});

const experienceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    role: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(), // Optional = current job
    location: z.string().optional(),
    tags: z.array(z.string()).optional(),
    order: z.number().optional(), // For custom sorting
    shown: z.boolean(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    link: z.string().optional(), // Live demo URL
    github: z.string().optional(), // GitHub repo URL
    featured: z.boolean().optional(), // Highlight on home page
    order: z.number().optional(), // For custom sorting
    shown: z.boolean(),
  }),
});

const educationCollection = defineCollection({
  type: 'content',
  schema: z.object({
    institution: z.string(),
    degree: z.string(), // Degree, certification name, etc.
    startDate: z.date(),
    endDate: z.date().optional(), // Optional = in progress
    location: z.string().optional(),
    tags: z.array(z.string()).optional(),
    type: z.enum(['degree', 'certification', 'course']).optional(),
    credentialLink: z.string().optional(), // Link to show credential
    order: z.number().optional(), // 0 = hidden/example
    shown: z.boolean(),
  }),
});

const publicationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    venue: z.string(), // Journal, conference, etc.
    date: z.date(),
    authors: z.array(z.string()).optional(),
    link: z.string().optional(), // Link to paper
    doi: z.string().optional(),
    tags: z.array(z.string()).optional(),
    order: z.number().optional(),
    shown: z.boolean(),
  }),
});

const eventsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(), // start (include time + offset, e.g. 2026-11-26T17:00:00-08:00)
    endDate: z.date().optional(),
    location: z.string().optional(), // venue name
    address: z.string().optional(), // street address for ICS / display
    description: z.string().optional(), // short summary (also used in the .ics)
    host: z.string().optional(),
    shown: z.boolean().default(true),
  }),
});

export const collections = {
  blog: blogCollection,
  events: eventsCollection,
  experience: experienceCollection,
  projects: projectsCollection,
  education: educationCollection,
  publications: publicationsCollection,
};
