import type { TPage } from '../types';

export const tagByNodeType = {
  'heading-1': 'h1',
  'heading-2': 'h2',
  'heading-3': 'h3',
  'heading-4': 'h4',
  'heading-5': 'h5',
  'heading-6': 'h6',
  'paragraph': 'p',
};

export const slugify = (str?: string): string => {
  if (!str) {
    return '';
  }

  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const mapPagesToObj = (pages: TPage[], value: any): Record<string, any> => {
  return (
    pages?.reduce((acc, page) => {
      page.elements.forEach(item => {
        acc[item.name] = value;
      });

      return acc;
    }, {}) || {}
  );
};
