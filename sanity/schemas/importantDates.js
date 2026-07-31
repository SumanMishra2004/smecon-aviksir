import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'importantDates',
  title: 'Important Dates Section',
  type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Year Edition (e.g. 2026, 2027)', type: 'string', initialValue: '2026' }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({
      name: 'datesList',
      title: 'Timeline Dates List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dateItem',
          title: 'Date Item',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'date', title: 'Date String', type: 'string' }),
            defineField({ name: 'iconKey', title: 'Icon Key (paper | edit | calendar)', type: 'string' }),
          ],
        },
      ],
    }),
  ],
});
