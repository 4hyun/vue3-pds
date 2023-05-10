import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import {
  VCheckbox,
  VDialog,
  VChip,
  VChipGroup,
  VTextField,
  VBtn,
} from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components: { VCheckbox, VDialog, VChip, VChipGroup, VTextField, VBtn },
  directives,
});

export default vuetify;
