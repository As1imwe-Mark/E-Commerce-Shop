// schemas/order.js
export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
    },
    {
      name: 'contact',
      title: 'Contact',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'total',
      title: 'Total',
      type: 'number',
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Product Name',
              type: 'string',
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
            },
            {
              name: 'size',
              title: 'Size',
              type: 'string',
            },
            {
              name: 'color',
              title: 'Color',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Image URL',
              type: 'url',
            },
          ],
        },
      ],
    },
  ],
};
