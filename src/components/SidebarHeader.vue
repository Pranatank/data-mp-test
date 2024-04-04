<template>
  <div class="sidebar flex">
    <q-btn icon="img:icons/menu.svg" size="md" class="menu-icon lt-md cursor-pointer" flat dense />
    <q-separator vertical class="lt-md" color="purple-2" />
    <img class="logo" src="logo.png" alt="logo" />
    <q-separator class="gt-sm" color="purple-2" />
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  width: 288px;
  height: 100%;
  min-height: 288px;
  background: $purple-1;
  gap: 12px;
  flex-direction: column;
  @media (max-width: $breakpoint-sm-max) {
    width: 100%;
    height: 56px;
    min-height: auto;
    gap: 16px;
    padding-left: 16px;
    flex-direction: row;
    align-items: center;
  }
  .logo {
    height: 48px;
    margin: 12px 48px 0 16px;
    align-self: flex-start;
    @media (max-width: $breakpoint-sm-max) {
      height: 40px;
      margin: 8px 0;
    }
  }
}
</style>
