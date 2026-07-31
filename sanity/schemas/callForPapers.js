import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'callForPapers',
  title: 'Call For Papers Section',
  type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Year Edition (e.g. 2026, 2027)', type: 'string', initialValue: '2026' }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Button Label', type: 'string' }),
        defineField({ name: 'url', title: 'URL', type: 'string' }),
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Button Label', type: 'string' }),
        defineField({ name: 'url', title: 'URL', type: 'string' }),
      ],
    }),
    defineField({ name: 'enquiryEmail', title: 'Enquiry Email', type: 'string' }),
    defineField({ name: 'subtext', title: 'Bottom Subtext', type: 'string' }),
    defineField({ name: 'templateUrl', title: 'Paper Template Download URL', type: 'string' }),
  ],
});
