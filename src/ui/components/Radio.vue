<template>
  <component
    :is="wrapper"
    v-model="inputModel"
    class="t-radio"
    :class="classList"
    :for="id"
  >
    <input
      :id="id"
      v-model="inputModel"
      type="radio"
      class="t-radio__input"
      :name="name"
      :value="value"
      :required="required"
      :disabled="disabled"
      v-bind="$attrs"
      v-on="$listeners"
      @mousedown.stop
      @mouseup.stop
    />
    <span
      class="t-radio__label"
      @mousedown="$emit('mousedown', $event)"
      @mouseup="$emit('mouseup', $event)"
    >
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<script>
export default {
  name: 'TRadio',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    modelValue: {
      type: [Object, Array, Boolean, String, Number],
      default: undefined,
    },

    /**
     * @param {String} label render the `label` into default slot
     */
    label: {
      type: String,
      default: undefined,
    },

    /**
     * @param {String} value Sets the value of the `name` attribute on the form control
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * @param {String} value Sets the value of the `id` attribute on the form control
     */
    id: {
      type: [String, undefined],
      default: undefined,
    },

    /**
     * @param {Object|Array|Boolean|String|Number} value Value returned when this radio is checked
     */
    value: {
      type: [Object, Array, Boolean, String, Number],
      default: 'on',
    },

    /**
     * @param {Boolean} required Adds the `required` attribute to the form control
     * @default false
     */
    required: {
      type: Boolean,
      default: false,
    },

    /**
     * @param {Boolean} disabled When set to `true`, disables the component's functionality and places it in a disabled state
     * @default false
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasLabel() {
      return !!(this.label ?? this.$slots.default);
    },
    wrapper() {
      return this.hasLabel ? 'label' : 'span';
    },
    hasCheckedAttr() {
      return 'checked' in this.$attrs && this.$attrs.checked !== false;
    },
    inputModel: {
      get() {
        if (typeof this.modelValue === 'undefined') {
          return this.hasCheckedAttr && this.value;
        }
        return this.modelValue;
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue);
      },
    },
    classList() {
      return {
        't-radio--inline': this.hasLabel,
        't-radio--disabled': this.disabled,
      };
    },
  },
};
</script>

<style lang="scss">
.t-radio {
  display: inline-flex;
  gap: 11px;
  margin: 0;
  padding: 0;
  user-select: none;
  align-items: baseline;
  font-weight: $--font-weight-normal;
  cursor: pointer;

  &__label {
    margin: 0;
    padding: 0;
  }

  &__input {
    cursor: pointer;
    appearance: none;
    position: relative;
    flex-shrink: 0;
    display: inline-block;
    margin: 0;
    width: 18px;
    height: 18px;
    text-align: center;
    transition-timing-function: ease-in;
    transition-duration: 150ms;
    transition-property: border-color, background-color;
    border-radius: 100px;
    border: 1px solid $--color-alto;
    background-color: $--color-white;

    &:checked {
      border-width: 6px;
      background-position: center center;
      background-repeat: no-repeat;
      border-color: $--color-black;
    }
  }

  &--inline &__input {
    transform: translate(0, 4px);
    margin: -5px 0 0 0;
  }

  &__input:focus,
  &:hover &__input,
  &:focus-within &__input {
    transition-duration: 50ms;
    border-color: $--color-dusty-gray;

    &:checked {
      border-color: $--color-mine-shaft;
    }
  }

  &--disabled {
    cursor: default;
  }

  &--disabled &,
  &--disabled:hover & {
    &__input {
      cursor: default;
      border-color: $--color-alto;
      background-color: $--color-gallery;

      &:checked {
        border-width: 5px;
        border-color: $--color-alto;
        background-color: $--color-white;
      }
    }

    &__label {
      color: $--color-alto;
    }
  }
}
</style>
