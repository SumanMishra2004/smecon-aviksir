import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'committee',
  title: 'Organizing Committee Section',
  type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Year Edition (e.g. 2026, 2027)', type: 'string', initialValue: '2026' }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({
      name: 'conveners',
      title: 'Conveners',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'patrons',
      title: 'Patrons',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
