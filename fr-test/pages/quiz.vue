<template>
    <div :class="$style.QuizPage"
         class="page">
        <div :class="$style.tabs">
            <nuxt-link
                v-for="(item, ind) in tabs"
                :key="ind"
                :to="`/quiz${item.link}`"
                :class="$style.tab">
                {{ item.name }}
            </nuxt-link>
        </div>

        <NuxtChild />

        <div :class="$style.form"></div>
    </div>
</template>

<script>
    export default {
        name: 'QuizPage',

        data() {
            return {
                tabs: [
                    {
                        name: 'Параметры',
                        link: '/',
                    },
                    {
                        name: 'Вопросы',
                        link: '/questions',
                    },
                    {
                        name: 'Логика',
                        link: '/logic',
                    },
                    {
                        name: 'Условия',
                        link: '/conditions',
                    },
                    {
                        name: 'Респонденты',
                        link: '/respondents',
                    },
                ],
            };
        },
    };
</script>

<style lang="scss" module>
    .QuizPage {
        max-width: 70%;
    }

    .tabs {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid $green;
    }

    .tab {
        display: block;
        padding: 1rem 2rem;
        color: $green-dark;
        cursor: pointer;

        &:global(.is-exact) {
            color: $black;
            font-weight: bold;
            border-bottom: 3px solid $green;
        }
    }
</style>
