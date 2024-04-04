import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { get } from '@/utils/axios';

interface Category {
  label: string;
  iconUrl: string;
  color: string;
  value?: string;
}

interface Categories {
  products: Category;
  catalogs: Category;
  brands: Category;
  sellers: Category;
}

export const useCategoriesStore = defineStore('categories', () => {
  const categories: Categories = reactive({
    products: { label: 'Товаров', iconUrl: 'icons/cart.svg', color: '#EFF8FF' },
    catalogs: { label: 'Каталогов', iconUrl: 'icons/category.svg', color: '#ECFDF3' },
    brands: { label: 'Брендов', iconUrl: 'icons/star.svg', color: '#FFFAEB' },
    sellers: { label: 'Продавцов', iconUrl: 'icons/store.svg', color: '#FFF1F3' },
  });
  const fetchCategoriesData = async () => {
    const { data } = await get('/api/mock-categories.json');
    Object.keys(categories).forEach((key) => {
      let value: string = data[key];
      if (+value >= 10_000) {
        value = (+value).toLocaleString('ru'); // 1000000 => 1 000 000
      }
      categories[key as keyof Categories].value = value;
    });
  };
  return { categories, fetchCategoriesData };
});
