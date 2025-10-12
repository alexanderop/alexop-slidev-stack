<template>
  <Default>
    <div class="two-cols-header w-full h-full">
      <div class="col-header">
        <slot />
      </div>
      <div class="col-left">
        <slot name="left" />
      </div>
      <div class="col-right">
        <slot name="right" />
      </div>
      <div class="col-bottom">
        <slot name="bottom" />
      </div>
    </div>
  </Default>
</template>

<script setup lang="ts">
import Default from '../layouts/default.vue'

defineProps({
  class: {
    type: String,
  },
  layoutClass: {
    type: String,
  },
  website: {
    type: String,
  },
  hideLogoInCorner: {
    type: Boolean,
  },
})
</script>

<style scoped>
.two-cols-header {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto 1fr auto;
  height: 100%;
}

.col-header {
  grid-area: 1 / 1 / 2 / 3;
}
.col-left {
  grid-area: 2 / 1 / 3 / 2;
}
.col-right {
  grid-area: 2 / 2 / 3 / 3;
}
.col-bottom {
  align-self: end;
  grid-area: 3 / 1 / 3 / 3;
}
</style>
