import type { CollectionConfig } from 'payload'

export const Stores: CollectionConfig = {
  slug: 'stores',
  labels: { singular: 'חנות', plural: 'חנויות מכירה ושירות' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'region', 'flagship'],
    description: 'נקודות שירות ומכירה פרימיום של הדרן',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'שם הסניף',
      type: 'text',
      required: true,
      admin: { description: 'לדוגמה: ירושלים — גאולה' },
    },
    {
      name: 'city',
      label: 'עיר',
      type: 'text',
      required: true,
    },
    {
      name: 'region',
      label: 'אזור',
      type: 'select',
      required: true,
      options: [
        { label: 'ירושלים והסביבה', value: 'jerusalem' },
        { label: 'מרכז', value: 'center' },
        { label: 'דרום', value: 'south' },
        { label: 'צפון', value: 'north' },
      ],
    },
    {
      name: 'address',
      label: 'כתובת',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      label: 'טלפון',
      type: 'text',
      required: true,
    },
    {
      name: 'hours',
      label: 'שעות פתיחה א׳–ה׳',
      type: 'text',
      required: true,
      admin: { description: 'לדוגמה: 09:00–21:00' },
    },
    {
      name: 'fridayHours',
      label: 'שעות פתיחה ו׳ וערב חג',
      type: 'text',
    },
    {
      name: 'hasLab',
      label: 'מעבדת אקספרס בסניף',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'flagship',
      label: 'סניף דגל',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'featured',
      label: 'מוצג בדף הבית',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'mapsUrl',
      label: 'קישור ל-Google Maps',
      type: 'text',
    },
    {
      name: 'geo',
      label: 'מיקום (ל-Schema)',
      type: 'group',
      fields: [
        { name: 'lat', label: 'קו רוחב', type: 'number' },
        { name: 'lng', label: 'קו אורך', type: 'number' },
      ],
    },
  ],
}
