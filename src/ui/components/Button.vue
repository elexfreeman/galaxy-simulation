<template>
  <component
    :is="componentTag"
    class="t-button"
    :href="href"
    :to="currentTo"
    :class="rootClasses"
    :type="currentType"
    :disabled="hasDisabled"
    v-bind="$attrs"
    v-on="$listeners"
    @click.capture.stop="onClick"
  >
    <span class="t-button__inner">
      <span v-if="hasLabelShow" class="t-button__label" data-testid="button-label">
        <slot>{{ label }}</slot>
      </span>
    </span>
  </component>
</template>

<script>

export default {
  name: 'TButton',

  components: { },

  props: {
    /**
     * @param {string} label - Sets text for button label
     * @default ''
     */
    label: {
      type: String,
      default: '',
    },

    /**
     * @param {string} href - If there is a href, the button becomes a link
     * @default undefined
     */
    href: {
      type: String,
      default: undefined,
    },

    /**
     * @param {string|Object} to - With to, the button will become router-link
     * @default undefined
     */
    to: {
      type: [String, Object],
      default: undefined,
    },

    /**
     * @param {string} theme - Sets a color theme for the button
     * @default 'primary'
     */
    theme: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'black', 'danger'].includes(value),
    },

    /**
     * @param {string} size - Sets the size of the button
     * @default 'md'
     */
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value),
    },

    /**
     * @param {string} type - Sets native type for button
     * @default 'button'
     */
    type: {
      type: String,
      default: 'button',
    },

    /**
     * @param {string} prependIcon - Sets name for prepend icon
     * @default ''
     */
    prependIcon: {
      type: String,
      default: '',
    },

    /**
     * @param {string} prependIcon - Sets name for append icon
     * @default ''
     */
    appendIcon: {
      type: String,
      default: '',
    },

    /**
     * @param {boolean} isPrependIconStroke - Sets stroke color for prepend icon
     * @default false
     */
    isPrependIconStroke: {
      type: Boolean,
      default: false,
    },

    /**
     * @param {boolean} isAppendIconStroke -  Sets stroke color for append icon
     * @default false
     */
    isAppendIconStroke: {
      type: Boolean,
      default: false,
    },

    /**
     * @param {boolean} icon - Makes a button round
     * @default false
     */
    icon: {
      type: Boolean,
      default: false,
    },

    /**
     * @param {boolean} isFluid - Makes a button 100% width
     * @default false
     */
    isFluid: {
      type: Boolean,
      default: false,
    },

    /**
     * @param {boolean} isRounded - Makes a border-radius 8px
     * @default false
     */
    isRounded: {
      type: Boolean,
      default: false,
    },

    /**
     * @param {boolean} disabled - Makes the button inactive
     * @default false
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * @param {boolean} loading - Makes the button in the loading state
     * @default false
     */
    loading: {
      type: Boolean,
      default: false,
    },

    /**
     * @param {boolean} stopPropagation
     * @default false
     */
    stopPropagation: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    componentTag() {
      if (this.href !== undefined) {
        return 'a';
      }

      return this.to !== undefined ? 'router-link' : 'button';
    },

    currentTo() {
      return this.componentTag === 'router-link' ? this.to : undefined;
    },

    rootClasses() {
      return [
        `t-button--theme-${this.theme}`,
        `t-button--size-${this.size}`,
        {
          't-button--link': this.hasLinkButton,
          't-button--with-prepend': this.hasPrependShow,
          't-button--with-append': this.hasAppendShow,
          't-button--with-label': this.hasLabelShow,
          't-button--fluid': this.isFluid,
          't-button--rounded': this.isRounded,
          't-button--disabled': this.hasDisabled,
          't-button--loading': this.loading,
          't-button--icon': this.icon,
        },
      ];
    },

    currentType() {
      return this.hasLinkButton ? null : this.type;
    },

    hasLinkButton() {
      return !!(this.href || this.to);
    },

    hasDisabled() {
      return this.disabled || this.loading;
    },

    hasPrependShow() {
      return !!(this.prependIcon || this.$slots.prepend);
    },

    hasLabelShow() {
      return !!(this.label || this.$slots.default);
    },

    hasAppendShow() {
      return !!(this.appendIcon || this.$slots.append);
    },
  },

  methods: {
    onClick(event) {
      if (this.stopPropagation) {
        event.stopPropagation();
      }

      if (this.hasDisabled) {
        if (this.hasLinkButton) {
          event.preventDefault();
          event.stopPropagation();
        }

        return;
      }

      this.$emit('click', event);
    },
  },
};
</script>

<style lang="scss">
$--icon-indent: 8px;
$--spinner-size: 24px;

.t-button {
  --btn-color: inherit;
  --btn-color-bg: inherit;
  --btn-color-bg-hover: inherit;
  --btn-color-disabled: inherit;
  --btn-color-bg-disabled: inherit;
  --btn-height: inherit;
  --btn-padding: inherit;
  --btn-font-size: inherit;
  --btn-line-height: inherit;
  --btn-with-icon-padding: inherit;

  display: inline-block;
  min-height: var(--btn-height);
  margin: 0;
  padding: var(--btn-padding);
  border: 0;
  background-image: none;
  background-color: var(--btn-color-bg);
  color: var(--btn-color);
  font-weight: $--font-weight-medium;
  font-size: var(--btn-font-size);
  line-height: var(--btn-line-height);
  text-align: center;
  black-space: normal;
  touch-action: manipulation;
  user-select: none;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;

  &__inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $--icon-indent;
  }

  &:hover {
    background-color: var(--btn-color-bg-hover);
    color: var(--btn-color);
  }

  &--link:hover,
  &--link:active,
  &--link:focus {
    background-color: var(--btn-color-bg-hover);
    color: var(--btn-color);
    text-decoration: none;
  }

  &--disabled {
    color: var(--btn-color-disabled);
    background-color: var(--btn-color-bg-disabled);
    cursor: default;

    &:hover,
    &:active {
      color: var(--btn-color-disabled);
      background-color: var(--btn-color-bg-disabled);
    }
  }

  &--disabled & {
    &__inner {
      pointer-events: none;
    }
  }

  &:not(#{&}--disabled):active & {
    &__inner {
      opacity: 0.8;
    }
  }

  &--fluid {
    width: 100%;
  }

  &--rounded {
    border-radius: 8px;
  }

  &--with-prepend & {
    &#{&}--with-label {
      padding-left: var(--btn-with-icon-padding);
    }
  }

  &--with-append & {
    &#{&}--with-label {
      padding-right: var(--btn-with-icon-padding);
    }
  }

  &--theme-primary {
    --btn-color: #{$--color-black};
    --btn-color-bg: #{$--color-white};
    --btn-color-bg-hover: #{$--color-mine-shaft};
    --btn-color-disabled: #{$--color-black};
    --btn-color-bg-disabled: #{$--color-alto};
  }

  &--theme-secondary {
    --btn-color: #{$--color-white};
    --btn-color-bg: #{$--color-mercury};
    --btn-color-bg-hover: #{$--color-alto};
    --btn-color-disabled: #{$--color-alto};
    --btn-color-bg-disabled: #{$--color-gallery};
  }

  &--theme-black {
    --btn-color: #{$--color-white};
    --btn-color-bg: #{$--color-black};
    --btn-color-bg-hover: #{$--color-gallery};
    --btn-color-disabled: #{$--color-alto};
    btn-color-bg-disabled: #{$--color-gallery};
  }

  &--theme-danger {
    --btn-color: #{$--color-black};
    --btn-color-bg: #{$--color-froly};
    --btn-color-bg-hover: #{$--color-apricot-peach};
    --btn-color-disabled: #{$--color-black};
    --btn-color-bg-disabled: #{$--color-cinderella};
  }

  &--size-sm {
    --btn-height: 32px;
    --btn-padding: 7px 20px;
    --btn-font-size: #{$--font-size-12};
    --btn-line-height: 18px;
    --btn-with-icon-padding: 18px;
  }

  &--size-md {
    --btn-height: 40px;
    --btn-padding: 10px 24px;
    --btn-font-size: #{$--font-size-14};
    --btn-line-height: 20px;
    --btn-with-icon-padding: 20px;
  }

  &--size-lg {
    --btn-height: 48px;
    --btn-padding: 11px 32px 12px;
    --btn-font-size: #{$--font-size-16};
    --btn-line-height: 25px;
    --icon-box-size: 24px;
    --icon-font-size: #{$--font-size-17};
    --btn-with-icon-padding: 30px;
  }

}
</style>
