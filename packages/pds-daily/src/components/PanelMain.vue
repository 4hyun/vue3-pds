<script setup lang="ts">
import { onMounted, inject, type Slots } from 'vue'
import { GridLayout, GridItem } from 'vue3-grid-layout-next'
import data from '@/data/grid-mock-simple'
import client, { requestConfig, tokenURL } from '@/api/swit'
import type { Auth, SwitTokenResponse } from '@/auth'
import { createApplyGridItemData } from '@/helpers/grid-view-features'
import { tasksList as tasksListData } from '@/data/swit-tasks-list'

type Item = (typeof data)[number]

const LayoutTransformType = {
  A: 'short',
  B: 'unit-square'
} as const

type LayoutTransform = typeof LayoutTransformType[keyof typeof LayoutTransformType]
const layoutTransformer = {
  [LayoutTransformType.A]: (data: Item[]) => {
    return data.map(({ h, ...rest }) => ({ ...rest, h: 2 }))
  },
  [LayoutTransformType.B]: (data: Item[]) => {
    return data.map(({ h, ...rest }) => ({ ...rest, h: 1 }))
  }
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
const applyGridItemData = createApplyGridItemData(layout)
const tasksList = tasksListData.map(applyGridItemData)
const layoutFromTasksList = tasksList.map(({ _grid, id }) => ({ ..._grid, id }))
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

const authorizeRequestConfig = requestConfig.authorize()
const authorizeParams = new URLSearchParams(authorizeRequestConfig.params)
const authorizeLink = `${authorizeRequestConfig.url
  }/?${authorizeParams.toString()}`

const useAuthTokenAsync = async (): Promise<[SwitTokenResponse] | []> => {
  const { search } = new URL(window.location.href)
  let result: [] | [SwitTokenResponse] = []
  const searchParams = new URLSearchParams(search)
  const code = searchParams.get('code')
  console.log({ searchParams, tokenURL, code, client })
  if (!code) return result

  try {
    const [url, params, config] = requestConfig.token(code)
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
</script>

<template>
  <div class="greetings">
    <a :href="authorizeLink">authorize</a>
    <GridLayout v-model:layout="layoutFromTasksList" @layout-updated="layoutUpdatedEvent">
      <Popover v-for="item in tasksList" :item="item" :key="item._grid.i">
        <GridItem :x="item._grid.x" :y="item._grid.y" :w="item._grid.w" :h="item._grid.h" :i="item._grid.i"
          @mouseover="onItemHover($event, item)">
          {{ item._grid.i }}
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

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
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
</style>
