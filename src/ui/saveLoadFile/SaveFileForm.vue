<template>
  <div class="save-file-form">
    <div class="save-file-form__title">Save view to JSON</div>
    <TButton v-if="!isOnSave" @click="onSaveToFile">Save</TButton>
    <TButton v-if="isOnSave" @click="onResume">Resume</TButton>
  </div>
</template>

<script>
import TButton from '@/ui/components/Button.vue';
import TInput from '@/ui/components/Input.vue';

export default {
  components: {
    TButton,
    TInput,
  },

  data() {
    return {
      isOnSave: false,
    };
  },

  computed: {},

  watch: {},

  mounted() {},

  methods: {
    onSaveToFile() {
      this.isOnSave = true;
      const link = document.createElement('a');
      window.isPause = true;
      const content = JSON.stringify(window.dataArr);
      const file = new Blob([content], { type: 'text/plain' });
      link.href = URL.createObjectURL(file);
      link.download = 'data.txt';
      link.click();
      URL.revokeObjectURL(link.href);
    },
    onResume() {
      this.isOnSave = false;
      window.isPause = false;
    }
  },
};
</script>

<style lang="scss">
.save-file-form {
  color: #ffffff;
}
</style>
