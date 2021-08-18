<template>
    <div class="v-select-option"
         :class="classes"
         @mouseenter="onMouseEnter"
         @mouseleave="onMouseLeave "
         @click="onClick"
         v-html="label">
    </div>
</template>

<script>
    export default {
        name: 'VSelectOption',

        props: {
            option: {
                type: Object,
                required: true,
                default: () => ({
                    value: '%value%',
                    label: '%label%',
                }),
            },

            value: {
                type: [String, Number, Array],
                required: true,
            },

            trackBy: {
                type: String,
                default: 'value',
            },

            labelKey: {
                type: String,
                default: 'label',
            },

            prefix: {
                type: String,
                default: '',
            },
            isHighlighted: Boolean,
            hideDisabled: Boolean,
        },

        computed: {
            classes() {
                return [
                    {
                        'is-highlighted': this.isHighlighted,
                        'is-selected': this.isSelected,
                        'is-disabled': this.option.disabled,
                        'is-hidden': this.hideDisabled && this.option.disabled,
                    },
                ];
            },

            label() {
                return this.prefix && this.option[this.trackBy] !== '' ? `${this.prefix} ${this.option[this.labelKey]}` : this.option[this.labelKey];
            },

            isSelected() {
                if (Array.isArray(this.value)) {
                    if (this.value.length) {
                        return this.value.includes(this.option[this.trackBy]);
                    } else {
                        return this.option[this.trackBy] === '';
                    }
                } else {
                    return this.value === this.option[this.trackBy];
                }
            },
        },

        methods: {
            onClick() {
                if (this.option.disabled) return;
                this.$emit('click', this.option[this.trackBy]);
            },

            onMouseEnter() {
                if (this.option.disabled) return;
                this.$emit('mouseenter');
            },

            onMouseLeave() {
                if (this.option.disabled) return;
                this.$emit('mouseleave');
            },
        },
    };
</script>

<style lang="scss">
    .v-select-option {
        padding: 0 1.6rem;
        width: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 3.6rem;
        color: $black;
        line-height: 1.52;
        user-select: none;
        transition: background-color $default-transition, color $default-transition;

        &.is-highlighted {
            background-color: $gray;
            //color: $blue-main;
        }

        &.is-selected {
            color: $green;
            background-color: $gray;
        }

        &.is-hidden {
            display: none;
        }

        &.is-disabled {
            color: rgba(black, .2);
            cursor: not-allowed;
        }
    }
</style>
