<template>
  <div>
    <q-bar dense class="bg-black text-white">
      <q-icon :name="fasSignal" />
      <div>Huey</div>
      <div>5G</div>
      <q-icon :name="fasWifi" />
      <q-space />
      <q-icon name="near_me" />
      <div>100%</div>
      <q-icon :name="fasBatteryFull" />
    </q-bar>
  </div>
</template>

<script>
import { fasSignal, fasWifi, fasBatteryFull } from '@quasar/extras/fontawesome-v5'

export default {
  name: "systembar",
  components: {},
  computed: {},
  setup () {
    return {
      fasSignal,
      fasWifi,
      fasBatteryFull
    }
  }
};
</script>

<style lang="scss">

</style>