import { defineType, defineField } from 'sanity';
import BulkImageUpload from '../components/BulkImageUpload';

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
      // BulkImageUpload renders a drag-and-drop zone above the normal array editor.
      // Drop or pick multiple images at once — they upload and are appended automatically.
      // Add captions per image using the list below after uploading.
      components: { input: BulkImageUpload },
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
          preview: {
            select: { title: 'caption', media: 'image' },
            prepare({ title, media }) {
              return { title: title || 'No caption', media };
            },
          },
        },
      ],
    }),
  ],
});
