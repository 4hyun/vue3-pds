<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import PanelMain from './components/PanelMain_draft.vue'
import { DialogId } from './common/dialogs';
import GlobalConfirm from '@/components/Dialogs/Confirm.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <PanelMain title="PDS Journal" />
      <nav>
        <RouterLink to="/day-organizer">Day Organizer</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <!-- TODO: refactor: extract vue component -->
  <v-dialog :value="DialogId.TaskItemDetail"></v-dialog>
  <global-confirm />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>