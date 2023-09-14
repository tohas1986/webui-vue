<template>
  <b-row>
    <b-col xl="10">
      <!-- Operation in progress alert -->
      <alert v-if="isOperationInProgress" variant="info" class="mb-5">
        <p>
          {{ $t('pageFirmware.alert.operationInProgress') }}
        </p>
      </alert>
      <!-- Power off server warning alert -->
      <alert v-else-if="!isServerOff" variant="warning" class="mb-5">
        <p class="mb-0">
          {{ $t('pageFirmware.alert.serverMustBePoweredOffTo') }}
        </p>
        <ul class="m-0">
          <li>
            {{ $t('pageFirmware.alert.switchRunningAndBackupImages') }}
          </li>
          <li>
            {{ $t('pageFirmware.alert.updateFirmware') }}
          </li>
        </ul>
        <template #action>
          <b-link to="/operations/server-power-operations">
            {{ $t('pageFirmware.alert.viewServerPowerOperations') }}
          </b-link>
        </template>
      </alert>
    </b-col>
  </b-row>
  <transition name="fade">
    <b-progress v-if="!isProgressComplete">
      <b-progress-bar
        striped
        animated
        :value="updateIndicatorValue"
        :aria-label="$t('global.ariaLabel.progressBar')"
      />
    </b-progress>
  </transition>
</template>

<script>
import Alert from '@/components/Global/Alert';

export default {
  data() {
    return {
      updateIndicatorValue: 0,
      isProgressComplete: false,
    };
  },
  components: { Alert },
  props: {
    isServerOff: {
      required: true,
      type: Boolean,
    },
  },
  computed: {
    isOperationInProgress() {
      return this.$store.getters['controls/isOperationInProgress'];
    },
  },
};
</script>

<style lang="scss" scoped>
.progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.4rem;
  opacity: 1;
  transition: opacity $duration--moderate-01 $standard-easing--productive;
  height: 0.4rem;

  &.fade-enter, // Remove this vue2 based only class when switching to vue3
  &.fade-enter-from, // This is vue3 based only class modified from 'fade-enter'
  &.fade-leave-to {
    opacity: 0;
  }
}
.progress-bar {
  background-color: $loading-color;
}
</style>
