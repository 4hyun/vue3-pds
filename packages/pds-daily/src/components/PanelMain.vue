<script setup lang="ts">
import { onMounted, ref, inject, computed, type Slots } from 'vue'
import { useTheme } from 'vuetify'
import { GridLayout, GridItem } from 'vue3-grid-layout-next'
import data from '@/data/grid-mock-simple'
import { client, apis, TOKEN_URL } from '@/api/swit'
import type { Auth, SwitTokenResponse } from '@/auth'
import {
  createApplyGridItemData,
  type CreateGrid,
} from '@/helpers/grid-view-utils'
import { tasksList as tasksListData } from '@/data/swit-tasks-list'
import type { GridBase, SwitTaskItem } from '@/types'
import { useGlobalDialogs } from '@/composables/use-global-dialogs'
import { DialogId } from '@/common/dialogs'

const TaskItemDetailFilters = {
  Content: 'content'
}

const useSelection = () => {
  const selected = ref<string[]>([])
  const select = (id: string) => {
    if (selected.value.includes(id)) return
    selected.value = selected.value.concat(id)
  }
  const selectAll = (values: string[]) => {
    selected.value = values
  }
  const deselect = (id: string) => {
    selected.value = selected.value.filter((v) => v !== id)
  }
  const deselectAll = () => {
    selected.value = []
  }
  return { selected, select, selectAll, deselect, deselectAll }
}

/* state */
const taskItemDetailFitlers = ref([])
const selection = useSelection()

const theme = useTheme()
console.log({ theme })

type Item = (typeof data)[number]

const LayoutTransformType = {
  A: 'short',
  B: 'unit-square',
} as const

type LayoutTransform =
  (typeof LayoutTransformType)[keyof typeof LayoutTransformType]
const layoutTransformer = {
  [LayoutTransformType.A]: (data: Item[]) => {
    return data.map(({ h, ...rest }) => ({ ...rest, h: 2 }))
  },
  [LayoutTransformType.B]: (data: Item[]) => {
    return data.map(({ h, ...rest }) => ({ ...rest, h: 1 }))
  },
}

function transformLayout(
  data: Item[],
  type: LayoutTransform | undefined = undefined
) {
  if (!type) return data
  return layoutTransformer[type](data)
}

const $auth = inject<Auth>('$auth')
let layout = transformLayout(data, LayoutTransformType.B)
// const applyGridItemData = createApplyGridItemData(layout)
const createGridItemData: CreateGrid<SwitTaskItem> = (options) => {
  const config = createGridItemData._config
  const x = options?.i ? +options.i % createGridItemData._config.xMax : 1
  const y = config.yCurrent
  if (options?.i) {
    if (x === config.xMax - 1) config.yCurrent++
  }

  return {
    x,
    y,
    w: 1,
    h: 1,
    i: options?.id || '',
    // ...options,
  }
}
createGridItemData.options = {}
createGridItemData._config = {
  _yCurrentInitial: 0,
  xMax: 5,
  yCurrent: 0,
}
const applyGridItemData = createApplyGridItemData(createGridItemData)
const tasksList = tasksListData.map((item, i) => applyGridItemData(item, i))
const taskById = computed(() => {
  const result = {}
  for (const task of tasksListData) {
    result[task.id] = task
  }
  return result
})
const layoutFromTasksList: Array<Item & { id: string }> = tasksList.map(
  ({ _grid, id }) => ({ ..._grid, id })
)
const layoutUpdatedEvent = (...args) => {
  console.log('DEBUG_layoutUpdatedEvent: ', args)
}
const onItemHover = ($event: MouseEvent, item: Item) => {
  // console.log('DEBUG_onItemHover: ', { item })
}

function Popover(
  props: { item: Item; key: string },
  { slots }: { slots: Slots }
) {
  // console.log({ slots, props })
  return slots?.default ? slots.default() : null
}

const authorizeRequestConfig = apis.Auth.authorize()
const authorizeParams = new URLSearchParams(authorizeRequestConfig.params)
const authorizeLink = `${authorizeRequestConfig.url
  }/?${authorizeParams.toString()}`

const useAuthTokenAsync = async (): Promise<[SwitTokenResponse] | []> => {
  const { search } = new URL(window.location.href)
  let result: [] | [SwitTokenResponse] = []
  const searchParams = new URLSearchParams(search)
  const code = searchParams.get('code')
  console.log({ searchParams, TOKEN_URL, code, client })
  if (!code) return result

  try {
    const [url, params, config] = apis.token(code)
    console.log({ url, params, config })
    const response = await client.post<SwitTokenResponse>(
      url,
      new URLSearchParams(params),
      config
    )
    console.log({ response })
    if (!response.data) return result
    result = [response.data]
    return result
  } catch (error) {
    console.log('token error', error)
    return result
  }
}

onMounted(async () => {
  const [tokenResponse] = await useAuthTokenAsync()
  if (tokenResponse) {
    console.log({ tokenResponse })
    $auth?.handleTokenResponse(tokenResponse)
  }
})

const onChange = (evt) => {
  if (evt.target.checked) selection.select(evt.target.value)
  else selection.deselect(evt.target.value)
}

const onChangeCheckboxAll = (evt) => {
  console.log({ onChangeCheckboxAll: evt })
  if (evt.target.checked)
    selection.selectAll(layoutFromTasksList.map(({ i }) => i))
  else selection.deselectAll()
}
</script>

<template>
  <div class="panel-main">
    <a :href="authorizeLink">authorize</a>
    <v-checkbox @change="onChangeCheckboxAll" label="select all" hide-details></v-checkbox>
    <v-chip-group v-model="taskItemDetailFitlers" multiple selected-class="text-primary">
      <v-chip prepend-icon="mdi-eye-outline" :value="TaskItemDetailFilters.Content">content</v-chip>
    </v-chip-group>
    <GridLayout v-model:layout="layoutFromTasksList" :responsive="false" :is-bounded="true" :use-css-transforms="true"
      :vertical-compact="false" @layout-updated="layoutUpdatedEvent">
      <Popover v-for="item in layoutFromTasksList" :item="item" :key="item.i">
        <GridItem :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" @mouseover="onItemHover($event, item)">
          <div class="task-item__inner">
            <v-checkbox v-model="selection.selected.value" :value="item.i" @change="onChange" hide-details
              density="compact"></v-checkbox>

            <h2 class="task-item__title">{{ taskById[item.id].title }}</h2>
            <span class="task-item__i">{{ item.i }}</span>
          </div>
        </GridItem>
      </Popover>
    </GridLayout>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.panel-main h1,
.panel-main h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .panel-main h1,
  .panel-main h3 {
    text-align: left;
  }
}

:global(.vue-grid-item) {
  border-width: 2px;
  border-style: solid;
  border-color: var(--vt-c-indigo);
  border-radius: 4px;
}

:global(.vue-grid-item.vue-grid-placeholder) {
  background: rgb(7, 31, 216);
  border-width: 2px;
  border-style: solid;
  border-color: var(--vt-c-indigo);
  border-radius: 4px;
}

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
