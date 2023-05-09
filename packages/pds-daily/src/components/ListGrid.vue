<script setup lang="ts">
import { computed } from 'vue'
import { GridLayout, GridItem } from 'vue3-grid-layout-next'
import { useSelection } from '@/composables/use-selection'


const layout = []
const selection = useSelection()
const taskById = computed(() => {
  const result = {}
  for (const task of tasksListData) {
    result[task.id] = task
  }
  return result
})
</script>

<template>
  <GridLayout v-model:layout="layout" :responsive="false" :is-bounded="true" :use-css-transforms="true"
    :vertical-compact="false">
    <Popover v-for="item in layout" :item="item" :key="item.i">
      <GridItem :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i">
        <div class="task-item__inner">
          <v-checkbox v-model="selection.selected.value" :value="item.i" hide-details density="compact"></v-checkbox>

          <h2 class="task-item__title">{{ taskById[item.id].title }}</h2>
          <span class="task-item__i">{{ item.i }}</span>
        </div>
      </GridItem>
    </Popover>
  </GridLayout>
</template>
<style scoped>
.task-item__i,
.task-item__title {
  font-size: .5rem;
}

.task-item__inner {
  margin: 0 6px 0px 6px;
}

.task-item__i {
  display: block;
  overflow-x: clip;
}

.task-item__title {
  font-size: .5rem;
}
</style>