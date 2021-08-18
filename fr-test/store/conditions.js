import Vue from 'vue';

export const state = () => ({
    activeConditions: [],
    allConditions: [
        {
            label: 'Выберите условие',
            value: '',
        },
        {
            label: 'Возраст респондента',
            value: 1,
            fields: {
                name: 'диапазон',
            },
        },
        {
            label: 'Тип карты лояльности',
            value: 2,
            fields: {
                name: 'тип',
                values: [
                    {
                        value: '',
                        label: 'Выберите тип',
                    },
                    {
                        value: 'silver',
                        label: 'Silver',
                    },
                    {
                        value: 'gold',
                        label: 'Gold',
                    },
                    {
                        value: 'platinum',
                        label: 'Platinum',
                    },
                ],
            },
        },
        {
            label: 'Статус карты лояльности',
            value: 3,
            fields: {
                name: 'статус',
                values: [
                    {
                        value: '',
                        label: 'Выберите статус',
                    },
                    {
                        value: 1,
                        label: 'Активна',
                    },
                    {
                        value: 2,
                        label: 'Не активна',
                    },
                ],
            },
        },
    ],
});

export const actions = {
    //
};

export const mutations = {
    changeConditions(state, payload) {
        const val = payload.val.value === 1 ? {min: '', max: ''} : payload.val.fields.values[0];
        Vue.set(payload.val, 'activeFields', [val]);
        state.activeConditions.splice(payload.index, 1, payload.val);
    },

    addCondition(state) {
        state.activeConditions.push(state.allConditions[0]);
    },

    deleteCondition(state, payload) {
        state.activeConditions.splice(payload, 1);
    },

    changeFields(state, payload) {
        state.activeConditions[payload.indexCondition].activeFields.splice(payload.indexField, 1, payload.val);
    },

    addField(state, payload) {
        if (state.activeConditions[payload].value === 1) {
            state.activeConditions[payload].activeFields.push({
                min: '',
                max: '',
            });
        } else {
            state.activeConditions[payload].activeFields.push(state.activeConditions[payload].fields.values[0]);
        }
    },
};
