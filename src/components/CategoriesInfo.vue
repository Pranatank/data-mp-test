<template>
  <div class="categories row justify-between">
    <div class="category" v-for="(category, name) in categoriesStore.categories" :key="name">
      <div class="category-text column">
        <span class="category-label">{{ category.label }}</span>
        <span class="category-value">{{ category.value }}</span>
      </div>
      <div class="category-icon flex items-center" :style="{ 'background-color': category.color }">
        <q-icon :name="`img:${category.iconUrl}`" size="24px" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories';

const categoriesStore = useCategoriesStore();
categoriesStore.fetchCategoriesData();
</script>

<style scoped lang="scss">
.categories {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 24px;
  @media (max-width: $breakpoint-md-max) {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}
.category {
  padding: 20px 24px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  @media (max-width: $breakpoint-sm-max) {
    padding: 14px 16px;
    flex-direction: column-reverse;
  }
  &-text {
    gap: 4px;
    @media (max-width: $breakpoint-sm-max) {
      gap: 0;
    }
  }
  &-label {
    font-size: 14px;
    line-height: 20px;
    color: #667085;
  }
  &-value {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    @media (max-width: $breakpoint-sm-max) {
      font-size: 18px;
      line-height: 28px;
    }
  }
  &-icon {
    border-radius: 50%;
    width: 56px;
    height: 56px;
    justify-content: center;
    @media (max-width: $breakpoint-sm-max) {
      justify-content: flex-start;
      width: auto;
      height: auto;
      background-color: transparent !important;
      margin-bottom: 8px;
    }
  }
}
</style>
