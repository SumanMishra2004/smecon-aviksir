import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'committee',
  title: 'Organizing Committee Section',
  type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Year Edition (e.g. 2026, 2027)', type: 'string', initialValue: '2026' }),
    defineField({
      name: 'isVisible',
      title: 'Show Committee Section',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle ON to show the Organizing Committee section on the website, or OFF to hide it completely.',
    }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({
      name: 'conveners',
      title: 'Conveners (Legacy Simple List)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'patrons',
      title: 'Patrons (Legacy Simple List)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'members',
      title: 'Committee Member Cards',
      description: 'Add members with name, profile image, LinkedIn profile URL, and domain specification (e.g. Technical, Publication, Publicity, Registration, Webmaster)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'committeeMember',
          title: 'Committee Member Card',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'domain',
              title: 'Domain / Sub-Committee',
              type: 'string',
              description: 'e.g. Technical, Publication, Publicity, Registration, Webmaster, Convener, Patron',
            }),
            defineField({ name: 'role', title: 'Role / Designation (Optional)', type: 'string' }),
            defineField({ name: 'affiliation', title: 'Affiliation (Optional)', type: 'string' }),
            defineField({ name: 'image', title: 'Profile Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'linkedinUrl', title: 'LinkedIn Profile URL', type: 'url' }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'domain',
              media: 'image',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Unnamed Member',
                subtitle: subtitle ? `Domain: ${subtitle}` : 'No domain specified',
                media,
              };
            },
          },
        },
      ],
    }),
  ],
});

