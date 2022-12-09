<template>
  <div class="load-file-form">
    <div class="load-file-form__title">Load view from JSON</div>
    <input class="load-file-form__file" type="file" ref="jsonFile" />
    <TButton v-if="!isOnLoad" @click="onLoadToFile">Load</TButton>
    <TButton v-if="isOnLoad" @click="onResume">Resume</TButton>
  </div>
</template>

<script>
import TButton from '@/ui/components/Button.vue';

export default {
  components: {
    TButton,
  },

  data() {
    return {
      isOnLoad: false,
    };
  },

  computed: {},

  watch: {},

  mounted() {},

  methods: {
    onLoadToFile() {
      this.isOnLoad = true;
      window.isPause = true;

      let file = this.$refs['jsonFile'].files[0];
      let reader = new FileReader();

      reader.readAsText(file);

      reader.onload = function () {
        const addStartJSON = JSON.parse(reader.result)
        
        for(let k in addStartJSON) {
          const item = [
            addStartJSON[k][0] - window.centerMassVector.x,
            addStartJSON[k][1] - window.centerMassVector.y,
            addStartJSON[k][2],
            addStartJSON[k][3],
          ]
         window.dataArr.push(item)
        }
      };

      reader.onerror = function () {
        console.log(reader.error);
      };
    },
    onResume() {
      this.isOnLoad = false;
      window.isPause = false;
    },
  },
};
</script>

<style lang="scss">
.load-file-form {
  color: #ffffff;

  &__file {
    margin: 10px 0;
  }
}
</style>
