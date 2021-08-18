<template>
    <div :class="$style.QuizCondition">
        <div :class="$style.condition">
            <div v-if="number > 0"
                 :class="$style.and"
                 class="and">
                И
            </div>

            <div :class="$style.top">

                <h3 :class="$style.number">
                    Условие {{ number + 1 }}
                </h3>

                <VSelect :class="$style.select"
                         :value="value"
                         :options="conditions"
                         size="small"
                         bordered
                         @input="$emit('on-change', {val: $event, oldVal: value})" />
            </div>

            <div :class="$style.fields">

                <div v-for="(item, ind) in condition.activeFields"
                     :key="ind"
                     :class="$style.field">

                    <div :class="$style.fieldLeft">
                        <div v-if="ind > 0"
                             :class="$style.or"
                             class="and">
                            или
                        </div>

                        <div :class="$style.fieldName">
                            <span>{{ condition.fields.name }}</span>
                            {{ ind + 1 }}
                        </div>
                    </div>

                    <div v-if="condition.value === 1"
                         :class="$style.fieldSelectWrap">
                        <div :class="$style.inputs">
                            от
                            <VInput
                                :class="$style.input"
                                type="number"
                                :min="0"
                                :value="item.min"
                                @input="onChangeAge(ind, {min: $event, max: item.max})"
                            />
                            до
                            <VInput
                                :class="$style.input"
                                type="number"
                                :min="0"
                                :value="item.max"
                                @input="onChangeAge(ind, {min: item.min, max: $event})"
                            />
                        </div>
                    </div>

                    <div v-else
                         :class="$style.fieldSelectWrap">
                        <VSelect :class="$style.fieldSelect"
                                 :value="item.value"
                                 :options="availableFields(item.value)"
                                 size="small"
                                 bordered
                                 @input="onChangeField(ind, {val: $event, oldVal: item.value})" />
                    </div>

                </div>

            </div>

            <div :class="$style.bottom">
                <transition name="fade">
                    <VButton
                        v-if="value !== ''"
                        :disabled="isButtonDisabled"
                        @click="addField">
                        <fa icon="plus"
                            :class="$style.icon" />
                        Добавить {{ condition.fields.name }}
                    </VButton>
                </transition>

                <VButton
                    :class="$style.delete"
                    color="red"
                    @click="$emit('on-delete', value)">
                    <fa icon="trash-alt"
                        :class="$style.icon" />
                    Удалить уcловие
                </VButton>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import VInput from '~/components/ui/input/VInput';

    export default {
        name: 'QuizCondition',
        components: {VInput},
        props: {
            conditions: {
                type: Array,
                default: () => [],
            },

            condition: {
                type: Object,
                default: () => ({}),
            },

            value: {
                type: [String, Number],
                default: '',
            },

            number: {
                type: Number,
                default: 0,
            },
        },

        data() {
            return {
                chosenVals: [],
                activeFields: [],
            };
        },

        computed: {
            ...mapState('conditions', {
                activeConditions: state => state.activeConditions,
            }),

            isButtonDisabled() {
                return !(this.condition.activeFields.length < this.condition.fields.values?.length - 1) && this.condition.value !== 1;
            },

            isValid() {
                let valid = false;

                if (this.condition.activeFields) {
                    for (const item of this.condition.activeFields) {
                        if (this.condition.value === 1) {
                            if (item.min !== '' || item.max !== '') {
                                valid = true;
                            }
                        } else if (item.value) {
                            valid = true;
                        }
                    }
                }

                return valid;
            },
        },

        methods: {
            onChangeField(ind, e) {
                if (!e.val) {
                    this.chosenVals = this.chosenVals.filter(item => item !== e.oldVal);
                } else {
                    this.chosenVals.push(e.val);
                }
                const newVal = this.condition.fields.values.find(item => item.value === e.val);

                this.$store.commit('conditions/changeFields', {
                    indexCondition: this.number,
                    indexField: ind,
                    val: newVal,
                });

                this.$emit('set-valid', this.isValid);
            },

            onChangeAge(ind, e) {
                const newVal = {
                    min: e.min,
                    max: e.max,
                };

                this.$store.commit('conditions/changeFields', {
                    indexCondition: this.number,
                    indexField: ind,
                    val: newVal,
                });

                this.$emit('set-valid', this.isValid);
            },

            addField() {
                this.$store.commit('conditions/addField', this.number);
            },

            availableFields(val) {
                return this.condition.fields.values?.filter(e => !this.chosenVals.includes(e.value) || e.value === '' || e.value === val);
            },
        },
    };
</script>

<style lang="scss" module>
    .QuizCondition {
        //
    }

    .condition {
        position: relative;
        padding: 2rem 2rem 4rem 2rem;
    }

    .and {
        position: absolute;
        left: 2rem;
        top: -1.5rem;
        width: 4rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        font-size: 1.2rem;
    }

    .or {
        width: 4rem;
        height: 3rem;
        margin-right: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        font-size: 1.2rem;
    }

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .bottom {
        position: relative;
        display: flex;
        justify-content: space-between;
        min-height: 4rem;
        width: 70%;
        margin-left: auto;
        margin-top: 3rem;
    }

    .delete {
        position: absolute;
        top: 0;
        right: 0;
    }

    .icon {
        margin-right: 1rem;
    }

    .number {
        font-weight: bold;
    }

    .select {
        width: 70%;
    }

    .field {
        display: flex;
        justify-content: space-between;
        margin-top: 3rem;
    }

    .fieldLeft {
        display: flex;
        align-items: center;
    }

    .fieldName {
        span {
            text-transform: capitalize;
        }
    }

    .fieldSelectWrap {
        width: 70%;
    }

    .fieldSelect {
        width: 100%;
        padding-right: 8rem;
    }

    .inputs {
        display: flex;
        align-items: center;
    }

    .input {
        width: 5rem;
        margin: 0 1rem;
    }
</style>
