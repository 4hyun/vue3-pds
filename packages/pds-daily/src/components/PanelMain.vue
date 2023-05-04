<script setup lang="ts">
import { onMounted, inject, type Slots } from 'vue'
import { GridLayout, GridItem } from 'vue3-grid-layout-next'
import data from '@/data/mock-simple'
import client, { requestConfig, tokenURL } from '@/api/swit'
import type { Auth, SwitTokenResponse } from '@/auth'

const $auth = inject<Auth>('$auth')
const layout = data
type Item = (typeof data)[number]
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
const authorizeLink = `${
  authorizeRequestConfig.url
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
    <GridLayout v-model:layout="layout" @layout-updated="layoutUpdatedEvent">
      <Popover v-for="item in layout" :item="item" :key="item.i">
        <GridItem
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          @mouseover="onItemHover($event, item)"
        >
          {{ item.i }}
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
