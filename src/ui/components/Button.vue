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
.t-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #FFFFFF;
  background: #1a1a1a;
  color: #FFFFFF;
  padding: 5px 30px;
  cursor: pointer;

  &:hover {
    background: #3c3c3c;
  }
}
</style>
