import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'fees',
  title: 'Registration Fees Section',
  type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Year Edition (e.g. 2026, 2027)', type: 'string', initialValue: '2026' }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading / Currency', type: 'string' }),
    defineField({
      name: 'feesList',
      title: 'Fee Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feeItem',
          title: 'Fee Item',
          fields: [
            defineField({ name: 'amount', title: 'Amount', type: 'string' }),
            defineField({ name: 'label', title: 'Target Category', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon Emoji or Key', type: 'string' }),
          ],
        },
      ],
    }),
  ],
});
