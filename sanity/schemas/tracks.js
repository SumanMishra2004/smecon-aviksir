import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'tracks',
  title: 'Conference Tracks Section',
  type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Year Edition (e.g. 2026, 2027)', type: 'string', initialValue: '2026' }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'tracksList',
      title: 'Tracks List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'track',
          title: 'Track',
          fields: [
            defineField({ name: 'trackId', title: 'Track ID (e.g. T1, T2)', type: 'string' }),
            defineField({ name: 'title', title: 'Track Title', type: 'string' }),
            defineField({ name: 'color', title: 'Color Theme (teal | purple | gold)', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({ name: 'bannerText', title: 'Highlight Banner Text', type: 'text' }),
  ],
});
