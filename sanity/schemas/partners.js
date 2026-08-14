import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'partners',
  title: 'Partners & Sponsors',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year Edition (e.g. 2026, 2027)',
      type: 'string',
      initialValue: '2026',
    }),
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Partners & Sponsors',
    }),
    defineField({
      name: 'subheading',
      title: 'Sub-heading / Description',
      type: 'string',
      initialValue: 'We are grateful to our partners and sponsors for supporting SMECON 2026.',
    }),
    defineField({
      name: 'partnerGroups',
      title: 'Partner Groups',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'partnerGroup',
          title: 'Partner Group',
          fields: [
            defineField({
              name: 'groupLabel',
              title: 'Group Label (e.g. Platinum Sponsor, Academic Partner)',
              type: 'string',
            }),
            defineField({
              name: 'partners',
              title: 'Partners',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'partnerItem',
                  title: 'Partner',
                  fields: [
                    defineField({ name: 'name', title: 'Organisation Name', type: 'string' }),
                    defineField({
                      name: 'logo',
                      title: 'Logo',
                      type: 'image',
                      options: { hotspot: true },
                    }),
                    defineField({
                      name: 'website',
                      title: 'Website URL',
                      type: 'url',
                    }),
                    defineField({
                      name: 'description',
                      title: 'Short Description (optional)',
                      type: 'string',
                    }),
                  ],
                  preview: {
                    select: { title: 'name', media: 'logo' },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'groupLabel' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'year' },
  },
});
