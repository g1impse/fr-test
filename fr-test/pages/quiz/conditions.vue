<template>
    <div :class="$style.QuizConditions">
        Условия
    </div>
</template>

<script>
    export default {
        name: 'QuizConditions',

        mounted() {
            this.$store.commit('setBreadcrumbs', [
                {
                    title: 'Опросы',
                    link: '/quiz'
                },
                {
                    title: 'Условия',
                    link: '',
                }
            ]);
        },
    };
</script>

<style lang="scss" module>
    .QuizConditions {
        padding: 2rem;
    }
</style>
