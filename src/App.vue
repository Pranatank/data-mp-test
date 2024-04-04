<template>
  <div class="content flex no-wrap">
    <SidebarHeader />
    <main>
      <h1>Личный кабинет</h1>
      <div class="main-panel">
        <CategoriesInfo />
        <ChartList />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import SidebarHeader from '@/components/SidebarHeader.vue';
import CategoriesInfo from '@/components/CategoriesInfo.vue';
import ChartList from '@/components/ChartList.vue';
</script>

<style scoped lang="scss">
.content {
  height: 100%;
  flex-direction: row;
  @media (max-width: $breakpoint-sm-max) {
    flex-direction: column;
  }
}
main {
  margin-top: 72px;
  background: #f9fafb;
  flex: 1;
  padding: 40px;
  @media (max-width: $breakpoint-sm-max) {
    margin-top: 0;
    padding: 12px 16px;
  }
  h1 {
    margin: 0 0 32px 0;
    font-size: 32px;
    font-weight: 600;
    line-height: 40px;
    @media (max-width: $breakpoint-sm-max) {
      margin-bottom: 24px;
    }
  }
}
</style>
