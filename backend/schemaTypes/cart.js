// schemas/cart.js
export default {
  name: 'cart',
  title: 'Cart',
  type: 'document',
  fields: [
    {
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'selectedSize',
      title: 'Selected Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
          { title: 'Extra Large', value: 'extra-large' }
        ]
      },
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'product.name',
      subtitle: 'product.price',
      media: 'product.image'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: `$${subtitle}`,
        media: media
      };
    }
  }
};
