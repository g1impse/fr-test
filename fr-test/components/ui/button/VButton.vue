<template>
    <button
        class="v-button"
        :class="classes"
        :disabled="disabled"
        @click="handleClick">
        <div v-if="icon"
             class="v-button__icon">
            <span>+</span>
        </div>
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'VButton',

        props: {
            color: {
                type: String,
                default: 'default',
            },
            size: {
                type: String,
                default: 'medium',
                validator(value) {
                    return ['big', 'large', 'medium', 'small'].indexOf(value) !== -1;
                },
            },
            disabled: Boolean,
            icon: Boolean,
        },

        computed: {
            classes() {
                return [
                    `v-button--${this.color}`,
                    `v-button--${this.size}`,
                ];
            },
        },

        methods: {
            handleClick(e) {
                if (this.disabled) return;
                this.$emit('click', e);
            },
        },
    };
</script>

<style lang="scss">
    .v-button {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        border-radius: 6px;
        padding: 1rem 2rem;
        cursor: pointer;
        transition: all $default-transition;

        /* Colors */
        &--default {
            background-color: white;
            color: $green;
            border: 1px solid $green;

            &:hover {
                background-color: $green;
                color: white;
            }
        }

        &--green {
            background-color: $green-dark;
            color: white;
            border: 1px solid $green-dark;

            &:hover {
                background-color: $green;
                border: 1px solid $green;
                color: white;
            }
        }

        &--red {
            background-color: white;
            border: 1px solid rgba($red, .5);
            color: $red;

            &:hover {
                background-color: $red;
                border: 1px solid rgba($red, 1);
                color: white;
            }
        }

        &__icon {
            display: block;
            font-size: 2.3rem;
            line-height: 1rem;
            transform: translate(-6px, -1px);
        }

        &:disabled {
            opacity: .6;
            pointer-events: none;
        }
    }
</style>
