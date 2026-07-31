import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'speakersSection',
  title: 'Keynote Speakers Section',
  type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Year Edition (e.g. 2026, 2027)', type: 'string', initialValue: '2026' }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({
      name: 'speakersList',
      title: 'Speakers List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'speakerItem',
          title: 'Speaker Item',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'role', title: 'Role / Position', type: 'string' }),
            defineField({ name: 'affiliation', title: 'Affiliation / University', type: 'string' }),
            defineField({ name: 'initials', title: 'Initials Fallback', type: 'string' }),
            defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'bio', title: 'Biography', type: 'text' }),
            defineField({ name: 'socialLinks', title: 'Social Links', type: 'array', of: [{ type: 'url' }] }),
          ],
        },
      ],
    }),
  ],
});
