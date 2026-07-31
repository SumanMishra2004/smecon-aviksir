import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Year Edition (e.g. 2026, 2027)', type: 'string', initialValue: '2026' }),
    defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'highlightedYear', title: 'Highlighted Year', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text' }),
    defineField({ name: 'organizerText', title: 'Organizer Details', type: 'text' }),
    defineField({
      name: 'backgroundImages',
      title: 'Background Slider Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'badges',
      title: 'Hero Badges',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'badge',
          title: 'Badge',
          fields: [
            defineField({ name: 'text', title: 'Badge Text', type: 'string' }),
            defineField({ name: 'iconType', title: 'Icon Type (calendar | online)', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({ name: 'conferenceDate', title: 'Conference Start Date & Time', type: 'datetime' }),
    defineField({ name: 'countdownLabel', title: 'Countdown Label', type: 'string' }),
    defineField({
      name: 'primaryButton',
      title: 'Primary CTA Button',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Button Label', type: 'string' }),
        defineField({ name: 'url', title: 'URL', type: 'string' }),
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary CTA Button',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Button Label', type: 'string' }),
        defineField({ name: 'url', title: 'URL', type: 'string' }),
      ],
    }),
  ],
});
