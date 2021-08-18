<template>
    <div :class="$style.QuizQuestions">
        Вопросы
    </div>
</template>

<script>
    export default {
        name: 'QuizQuestions',

        mounted() {
            this.$store.commit('setBreadcrumbs', [
                {
                    title: 'Опросы',
                    link: '/quiz'
                },
                {
                    title: 'Вопросы',
                    link: '',
                }
            ]);
        },
    };
</script>

<style lang="scss" module>
    .QuizQuestions {
        padding: 2rem;
    }
</style>
