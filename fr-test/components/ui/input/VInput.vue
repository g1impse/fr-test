<template>
    <div class="v-input__wrap">
        <input v-model="lazyValue"
               :class="{_error: error}"
               class="v-input"
               :type="type"
               :min="min"
               :max="max"
               :placeholder="placeholder"
               @input="onInput"
               @change="onChange"
               @focus="onFocus">

        <transition name="fade">
            <span v-if="error"
                  class="v-input__error">
                {{ error }}
            </span>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'VInput',

        props: {
            value: [String, Number],

            type: {
                type: String,
                default: 'text',
            },

            min: Number,
            max: Number,

            placeholder: {
                type: String,
                default: '',
            },

            error: {
                type: String,
                default: '',
            },
        },

        data() {
            return {
                lazyValue: this.value || '',
            };
        },

        watch: {
            value(val) {
                if (val !== this.lazyValue) {
                    let newValue = val;

                    this.lazyValue = newValue;
                    this.$emit('input', newValue);
                }
            },
        },

        methods: {
            onInput() {
                this.$emit('input', this.lazyValue);
            },

            onChange(e) {
                this.$emit('focus', e);
            },

            onFocus(e) {
                this.$emit('focus', e);
            },
        },
    };
</script>

<style lang="scss">
    .v-input {
        width: 100%;
        padding: 1rem 1.5rem;
        border: 1px solid $border;
        border-radius: 8px;
        transition: border-color $default-transition;

        &._error {
            border-color: $red;
        }

        &__wrap {
            position: relative;
        }

        &__error {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            color: $red;
            text-align: left;
            font-size: 1.2rem;
        }
    }
</style>
