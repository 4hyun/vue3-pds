import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { VCheckbox } from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components: { VCheckbox },
  directives,
})

export default vuetify
