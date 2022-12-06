<template>
  <div v-fragment>
    <div :class="classes" class="t-input">
      <label v-show="showLabel" :class="labelClassModifier" class="t-input__label">
        {{ label }} <span v-if="required" class="t-input__asterisk">*</span>
      </label>
      <input
        ref="inputField"
        class="t-input__input"
        :class="computedInputClasses"
        :value="value"
        :maxlength="maxlength"
        :disabled="disabled"
        :placeholder="inputPlaceholder"
        :type="inputType"
        :inputmode="inputMode"
        @input="updateValue($event.target.value)"
        @focus="onFocus(true)"
        @blur="onBlur(false)"
        @click="emitClick"
      />
    </div>

    <div v-show="showError" class="t-input__error-message" :class="errorMessageClass">
      {{ errorMessage }}
    </div>

    <div v-show="isHintNeeded" class="t-input__hint">
      {{ hint }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TInput',

  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    labelClassModifier: {
      type: String,
      default: '',
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'full',
      validator: (value) => ['sm', 'md', 'lg', 'full'].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: ' ',
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    inputClass: {
      type: String,
      default: '',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    inputMode: {
      type: String,
      default: 'text',
    },
    hint: {
      type: String,
      default: '',
    },
    errorMessageClass: {
      type: String,
      default: '',
    },
    success: {
      type: Boolean,
      default: false,
    },
    isNeedHideHint: {
      type: Boolean,
      default: false,
    },
    isHintHidden: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
      default: 9999,
    },
  },

  data() {
    return {
      isLabelVisible: false,
      isHintVisible: true,
    };
  },

  computed: {
    classes() {
      return {
        't-input--primary': this.primary,
        't-input--secondary': !this.primary,
        't-input--with-label': !!this.label,
        't-input--disabled': this.disabled,
        't-input--error': this.error,
        't-input--success': this.success,
        [`t-input--size-${this.size}`]: true,
        [this.inputClass]: true,
      };
    },
    showLabel() {
      return (this.label && this.value) || this.isLabelVisible;
    },
    computedInputClasses() {
      return {
        't-input__input--value-exists': this.value,
      };
    },
    showError() {
      return this.error && this.errorMessage;
    },
    inputPlaceholder() {
      return this.required ? `${this.placeholder} *` : this.placeholder;
    },
    isHintNeeded() {
      return !this.isHintHidden && this.hint && this.isHintVisible;
    },
  },

  methods: {
    updateValue(value) {
      if (this.isDropdownMode) {
        this.isDropdownOpened = true;
      }
      this.$emit('input', value);
    },
    displayLabel(isVisible) {
      if (this.label) {
        this.isLabelVisible = isVisible;
      }
    },
    emitClick() {
      this.$emit('click');
    },
    onFocus(isVisible) {
      this.changeHintVisibility();
      this.displayLabel(isVisible);
      this.$emit('focus');
    },
    onBlur(isVisible) {
      this.displayLabel(isVisible);
      this.$emit('blur');
    },
    changeHintVisibility() {
      if (this.isNeedHideHint) {
        this.isHintVisible = false;
      }
    },
  },
};
</script>

<style lang="scss">
.t-input {
  $root: &;

  position: relative;
  color: $--color-dusty-gray;
  font-size: $--font-size-16;

  &__label {
    position: absolute;
    bottom: 33px;
    font-size: $--font-size-12;
    font-weight: $--font-weight-normal;
    color: $--color-dusty-gray;
    line-height: 18px;

    &--capitalize {
      &::first-letter {
        text-transform: capitalize;
      }
    }
  }

  &__input {
    max-width: 100%;
    min-width: 100%;
    width: 100%;
    font-size: $--font-size-16;
    line-height: 25px;
    box-sizing: border-box;
    font-weight: $--font-weight-normal;
    border: 0 none;
    border-bottom: 1px solid $--color-alto;
    color: $--color-dusty-gray;
    padding: 10px 0;
    background-color: transparent;
    border-radius: 0;

    &::placeholder {
      opacity: 1;
    }

    &:focus {
      outline: none;
      color: $--color-white;
      border-bottom-color: $--color-white;
    }

    &:focus,
    &:active {
      + #{$root}__right-icon {
        color: $--color-white;

        &--password-eye {
          display: flex;
        }
      }
    }
  }


  &__error-message {
    color: $--color-froly;
    font-size: $--font-size-12;
    line-height: 18px;
    margin-top: 8px;
  }

  &__hint {
    color: $--color-dusty-gray;
    font-size: $--font-size-12;
    line-height: 18px;
    margin-top: 8px;
  }

  &__asterisk {
    color: $--color-froly;
  }

  &--primary {
    color: $--color-black;
  }

  &--size-sm {
    font-size: $--font-size-12;
  }

  &--size-md {
    width: 300px;
  }

  &--size-lg {
    width: 500px;
  }

  &--size-full {
    width: 100%;
  }

  &--with-label {
    padding-top: 10px;

    & input:focus::placeholder {
      color: transparent;
    }
  }

  &--disabled & {
    &__input {
      color: $--color-alto;
    }

    &__label {
      color: $--color-alto;
    }

    &__asterisk {
      color: $--color-alto;
    }
  }

  &--error & {
    &__input {
      border-bottom-color: $--color-froly;
    }
  }

  &--success & {
    &__input {
      border-bottom-color: $--color-emerald;
      background: url('@/assets/icons/input-success.svg') no-repeat 98% 50%;
    }
  }

  &--left-icon & {
    &__input {
      padding-left: 34px;
    }
  }

  &--right-icon & {
    &__input {
      padding-right: 34px;
    }
  }
}
</style>
