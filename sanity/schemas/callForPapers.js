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

    // ── PDF Downloads ──────────────────────────────────────────────────────────
    defineField({
      name: 'abstractBookVisibility',
      title: 'Show Abstract Book Button',
      type: 'string',
      options: {
        list: [
          { title: 'Show on website', value: 'show' },
          { title: 'Hide from website', value: 'hide' },
        ],
        layout: 'radio',
      },
      initialValue: 'hide',
      description: 'Set to Show only after the abstract book PDF is uploaded below.',
    }),
    defineField({
      name: 'abstractBookFile',
      title: 'Abstract Book PDF',
      type: 'file',
      options: { accept: '.pdf' },
      description: 'Upload the conference abstract book PDF. Set visibility to Show when ready.',
    }),
    defineField({
      name: 'abstractBookLabel',
      title: 'Abstract Book Button Label',
      type: 'string',
      initialValue: 'Download Abstract Book',
    }),

    defineField({
      name: 'flyerVisibility',
      title: 'Show Conference Flyer Button',
      type: 'string',
      options: {
        list: [
          { title: 'Show on website', value: 'show' },
          { title: 'Hide from website', value: 'hide' },
        ],
        layout: 'radio',
      },
      initialValue: 'hide',
      description: 'Set to Show only after the conference flyer PDF is uploaded below.',
    }),
    defineField({
      name: 'flyerFile',
      title: 'Conference Flyer PDF',
      type: 'file',
      options: { accept: '.pdf' },
      description: 'Upload the conference flyer PDF. Set visibility to Show when ready.',
    }),
    defineField({
      name: 'flyerLabel',
      title: 'Flyer Button Label',
      type: 'string',
      initialValue: 'Download Conference Flyer',
    }),
  ],
});
