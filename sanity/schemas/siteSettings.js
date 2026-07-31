import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings & Navigation',
  type: 'document',
  fields: [
    defineField({ name: 'brandName', title: 'Brand Name', type: 'string', initialValue: 'SMECON' }),
    defineField({ name: 'brandYear', title: 'Brand Year', type: 'string', initialValue: '2026' }),
    defineField({
      name: 'currentYear',
      title: 'Current Active Year',
      type: 'string',
      initialValue: '2026',
      description: 'The year that the root website URL (/) should redirect to by default.',
    }),
    defineField({ name: 'ikcLogo', title: 'IKC Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'smcLogo', title: 'SMC Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'smeconLogo', title: 'SMECON Logo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navLink',
          title: 'Nav Link',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'URL / Anchor (#section)', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({ name: 'organizerFooterText', title: 'Organizer Footer Text', type: 'text' }),
    defineField({ name: 'copyrightText', title: 'Copyright Text', type: 'string' }),
  ],
});
