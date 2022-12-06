<template>
  <component :is="wrapper" class="t-checkbox" :class="classList" :for="id">
    <input
      :id="id"
      v-model="inputModel"
      type="checkbox"
      class="t-checkbox__input"
      :name="name"
      :value="value"
      :true-value="trueValue"
      :false-value="falseValue"
      :required="required"
      :disabled="disabled"
      v-bind="$attrs"
      v-on="$listeners"
      @mousedown.stop
      @mouseup.stop
    />
    <span
      v-if="hasLabel"
      class="t-checkbox__label"
      @mousedown="$emit('mousedown', $event)"
      @mouseup="$emit('mouseup', $event)"
    >
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<script>
export default {
  name: 'TCheckbox',

  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },

  props: {
    /**
     * @param {Boolean} disabled When set to `true`, disables the component's functionality and places it in a disabled state
     * @default false
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * @param {Object|Array|Boolean|String|Number} value Value returned when this checkbox is unchecked. Note not applicable when multiple checkboxes bound to the same v-model array
     */
    falseValue: {
      type: [Object, Array, Boolean, String, Number],
      default: false,
    },

    /**
     * @param {String} value Sets the value of the `id` attribute on the form control
     */
    id: {
      type: [String, undefined],
      default: undefined,
    },

    /**
     * @param {String} label render the `label` into default slot
     * @example
     */
    label: {
      type: String,
      default: undefined,
    },

    /**
     * @param {Object|Array|Boolean|String|Number} modelValue
     */
    modelValue: {
      type: [Object, Array, Boolean, String, Number],
      default: undefined,
    },

    /**
     * @param {String} value Sets the value of the `name` attribute on the form control
     */
    name: {
      type: [String, undefined],
      default: undefined,
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
     * @param {Object|Array|Boolean|String|Number} value Value returned when this checkbox is checked. Note not applicable when multiple checkboxes bound to the same v-model array
     */
    trueValue: {
      type: [Object, Array, Boolean, String, Number],
      default: true,
    },

    /**
     * @param {Object|Array|Boolean|String|Number} value Value returned when this checkbox is checked
     */
    value: {
      type: [Object, Array, Boolean, String, Number],
      default: 'on',
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
          return this.hasCheckedAttr;
        }
        return this.modelValue;
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue);
      },
    },
    classList() {
      return {
        't-checkbox--inline': this.hasLabel,
        't-checkbox--disabled': this.disabled,
      };
    },
  },
};
</script>

<style lang="scss">
.t-checkbox {
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
    color: $--color-black;
    font-family: $--font-family-site;
    font-size: $--font-size-14;
    font-weight: $--font-weight-normal;
    line-height: 18px;
  }

  &__input {
    cursor: pointer;
    appearance: none;
    flex-shrink: 0;
    display: inline-block;
    margin: 0;
    width: 18px;
    height: 18px;
    text-align: center;
    transition: border-color, background-color 150ms ease-in;
    border-radius: 1px;
    border: 1px solid $--color-alto;
    background: $--color-white;

    &:checked {
      transition: border-color, background-color 150ms ease-in;
      background-image: url('@/assets/icons/checkbox-mark-white.svg');
      background-position: center center;
      background-repeat: no-repeat;
      background-color: $--color-black;
      border-color: $--color-black;
    }
  }

  &--inline &__input {
    transform: translate(0, 4px);
    margin: -5px 0 0 0;
  }

  &:hover &__input,
  &:focus &__input,
  &:focus-within &__input {
    transition-duration: 50ms;
    border-color: $--color-dusty-gray;

    &:checked {
      background-color: $--color-mine-shaft;
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
      background-color: $--color-gallery;
      border-color: $--color-alto;

      &:checked {
        background-color: $--color-alto;
        border-color: $--color-alto;
      }
    }

    &__label {
      color: $--color-alto;
    }
  }
}
</style>
