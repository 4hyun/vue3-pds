<script setup lang="ts">
import { onMounted } from 'vue'
import { GridLayout, GridItem } from 'vue3-grid-layout-next'
import data from '@/data/mock-simple'
import client, { authorize, requestConfig, authorizeURL, tokenURL } from '@/api/swit'

const layout = data
const authorizeParams = new URLSearchParams(requestConfig.authorize().params)
const authorizeLink = `${authorizeURL}/?${authorizeParams.toString()}`

const handleAuthorizationCodeExchange = async () => {
  const { search } = new URL(window.location.href)
  const result: [] | [string] = []
  const searchParams = new URLSearchParams(search)
  const code = searchParams.get('code')
  console.log({ searchParams, tokenURL, code, client })
  if (!code) return result
  client.defaults.baseURL = tokenURL
  const response = await client.post('/', ...requestConfig.token(code))
  console.log({ response })
  if (!response.data) return result
  result.push(response.data?.acess_token)
  return result
}

onMounted(async () => {
  // const response = await authorize()
  // console.log({ debug_response: response })
  console.log(window.location.href)
  const [token] = await handleAuthorizationCodeExchange()
  if (token) {
    console.log({ token })
  }


})

</script>

<template>
  <div class="greetings">
    <a :href="authorizeLink">authorize</a>
    <GridLayout v-model:layout="layout">
      <GridItem v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
        {{ item.i }}
      </GridItem>
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
  border-color: red;
}
</style>
