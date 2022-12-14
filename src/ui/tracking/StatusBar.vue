<template>
  <div class="tracking-status-bar">
    <div class="tracking-status-bar__item-xy">
      <span>{{xy.x}}</span>
      <span>{{xy.y}}</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
    };
  },

  props: {
    centerMassVector: {
      type: Object,
    },
  },
  computed: {
    xy() {
      const x = Math.ceil(this.centerMassVector.x* 100)/100;
      const y = Math.ceil(this.centerMassVector.y* 100)/100;
      return {
        x,y
      }
    }
  },

  watch: {},

  mounted() {
  },

  methods: {
  },
};
</script>

<style lang="scss">
.tracking-status-bar {
  display: flex;

  &__item {
    padding: 5px;
  }

  &__item-xy {
    padding: 5px;
    width: 105px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
