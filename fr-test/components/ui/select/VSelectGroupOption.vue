<template>
    <div class="v-select-group-option">
        <h6 v-if="group.label"
            class="v-select-group-option__label"
            :class="{'is-hidden': !isVisibleLabel}"
            @click="handleGroupLabelClick">
            {{ group.label }}
        </h6>
        <div class="v-select-group-option__body">
            <slot />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VSelectGroupOption',

        components: {},

        props: {
            group: {
                type: Object,
                required: true,
                default: () => ({
                    options: '%options%',
                    label: '%label%',
                }),
            },

            hideDisabled: Boolean,
            isClickableLabel: {
                type: Boolean,
                default: true,
            },

            trackBy: {
                type: String,
                default: 'value'
            }
        },

        computed: {
            isVisibleLabel() {
                return this.hideDisabled ? this.group.options.findIndex(item => !item.disabled) !== -1 : true;
            },

            classes() {
                return {
                    'is-hidden': !this.isVisibleLabel,
                    'non-clickable': !this.isClickableLabel,
                };
            },
        },

        methods: {
            handleGroupLabelClick() {
                if (!this.isClickableLabel) return;
                let options = this.group.options.filter(opt => !opt.disabled);
                this.$emit('group-label-click', options.map(opt => opt[this.trackBy]));
            },
        },
    };
</script>

<style lang="scss">
    .v-select-group-option {
        &__label {
            padding: 1.2rem;
            font-weight: bold;
            background-color: rgba($border, .5);
            transition: background-color $default-transition;
            cursor: pointer;
            user-select: none;

            &:hover {
                background-color: rgba($border, .3);
            }

            &.is-hidden {
                display: none;
            }

            &.non-clickable {
                pointer-events: none;
            }
        }
    }
</style>
