import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'gallery',
  title: 'Conference Gallery Section',
  type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Year Edition (e.g. 2026, 2027)', type: 'string', initialValue: '2026' }),
    defineField({
      name: 'isVisible',
      title: 'Show Gallery Section',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle ON to show the Gallery section on the website, or OFF to hide it completely.',
    }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'imagesList',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryItem',
          title: 'Gallery Item',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'url', title: 'External Image URL (fallback)', type: 'url' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
  ],
});
