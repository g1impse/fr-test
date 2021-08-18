<template>
    <div :class="$style.QuizRespondents">
        <h3 :class="$style.title">
            Добавить опрос
        </h3>

        <div :class="$style.conditions">
            <QuizCondition
                v-for="(item, ind) in activeConditions"
                :key="ind"
                :class="$style.condition"
                :conditions="availableConditions(item.value)"
                :value="item.value"
                :condition="item"
                :number="ind"
                @on-change="onChange(ind, $event)"
                @on-delete="onDelete(ind, $event)"
                @set-valid="setValid(ind, $event)"
            />
        </div>

        <div :class="[$style.btn, {[$style._disabled]: isButtonDisabled}]"
             @click="addCondition">
            <fa icon="plus"
                :class="$style.btnIcon" />

            <div :class="$style.btnText">
                Нажмите, чтобы добавить новое условие выборки.
            </div>

            <div :class="$style.btnText">
                Все условия связываются между собой логическим "И"
            </div>
        </div>

        <div :class="$style.footer">
            <VButton
                :class="$style.footerBtn"
                :disabled="!isNextActive"
                color="green"
                @click="onSubmit">
                Далее
                <fa icon="arrow-right"
                    :class="$style.icon" />
            </VButton>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import QuizCondition from '~/components/pages/quiz/QuizCondition';

    export default {
        name: 'QuizRespondents',

        components: {
            QuizCondition,
        },

        data() {
            return {
                chosenVals: [],
                valid: [],
            };
        },

        computed: {
            ...mapState('conditions', {
                activeConditions: state => state.activeConditions,
                conditions: state => state.allConditions,
            }),

            isButtonDisabled() {
                return !(this.activeConditions.length < this.conditions.length - 1);
            },

            isNextActive() {
                return this.valid.length ? this.valid.reduce((acc, cur) => acc || cur) : false;
            },
        },

        mounted() {
            console.log(1);
            this.$store.commit('setBreadcrumbs', [
                {
                    title: 'Опросы',
                    link: '/quiz'
                },
                {
                    title: 'Респонденты',
                    link: '',
                }
            ]);
        },

        methods: {
            onChange(ind, e) {
                if (!e.val) {
                    this.chosenVals = this.chosenVals.filter(item => item !== e.oldVal);
                } else {
                    this.chosenVals.push(e.val);
                }
                const newVal = this.conditions.find(item => item.value === e.val);

                this.$store.commit('conditions/changeConditions', {
                    index: ind,
                    val: newVal,
                });
            },

            addCondition() {
                this.$store.commit('conditions/addCondition');
            },

            onDelete(ind, e) {
                this.chosenVals = this.chosenVals.filter(item => item !== e);
                this.$store.commit('conditions/deleteCondition', ind);
                this.valid.splice(ind, 1);
            },

            availableConditions(val) {
                return this.conditions.filter(e => !this.chosenVals.includes(e.value) || e.value === '' || e.value === val );
            },

            setValid(ind, e) {
                this.valid.splice(ind, 1, e);
            },

            // отправка на сервер
            async onSubmit() {
                const data = {};

                for (let item of this.activeConditions) {
                    data[item.value] = item.value === 1 ? item.activeFields.filter(e => e.min !== '' || e.max !== '') : item.activeFields.map(e => e.value).filter(e => e !== '');
                }

                try {
                    await this.$axios.$post(this.$api.conditions, data);
                } catch (e) {
                    console.warn('[respondents/onSubmit] request failed: ', e);
                }
            },
        },
    };
</script>

<style lang="scss" module>
    .QuizRespondents {
        box-shadow: 0 7px 13px -1px rgba(black, .1);
    }

    .title {
        padding: 2rem;
        color: $gray-dark;
        font-weight: bold;
    }

    .btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 2rem;
        padding: 2rem;
        border: 1px solid $gray-dark;
        border-radius: 4px;
        color: $green-dark;
        cursor: pointer;
        transition: all $default-transition;

        &:hover {
            background-color: $gray;
        }

        &._disabled {
            pointer-events: none;
            cursor: not-allowed;
            opacity: .3;
        }
    }

    .btnIcon {
        margin-bottom: 1rem;
    }

    .condition {
        &:not(:last-child) {
            border-bottom: 1px solid $border;
        }

        &:nth-child(4n + 1) {
            background-color: #fffcf5;

            h3 {
                color: #a97a0f;
            }

            :global(.and) {
                background-color: #f7f1e3;
            }
        }

        &:nth-child(4n + 2) {
            background-color: #f8faff;

            h3 {
                color: #2248a6;
            }

            :global(.and) {
                background-color: #e5f0fa;
            }
        }

        &:nth-child(4n + 3) {
            background-color: #fafff8;

            h3 {
                color: #6da622;
            }

            :global(.and) {
                background-color: #e7f6db;
            }
        }

        &:nth-child(4n + 4) {
            background-color: #fafafa;

            h3 {
                color: $black;
            }

            :global(.and) {
                background-color: $green-dark;
            }
        }
    }

    .footer {
        display: flex;
        padding: 2rem;
        background-color: #f4f7f9;
    }

    .footerBtn {
        margin-left: auto;
    }

    .icon {
        margin-left: 1rem;
    }
</style>
