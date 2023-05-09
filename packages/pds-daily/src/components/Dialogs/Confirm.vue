<script setup lang="ts">
import { onMounted } from 'vue'
import { useGlobalDialogs } from '@/composables/use-global-dialogs';
import { DialogId } from '@/common/dialogs'

const dialogId = DialogId.GlobalConfirm

const [dialogs, { register }] = useGlobalDialogs()

onMounted(() => {
  register({ id: dialogId })
  setDialog(dialogId, true)
})
</script>
<template>
  <v-dialog :value="dialogs[dialogId] || true">
    fallback-content
  </v-dialog>
</template>