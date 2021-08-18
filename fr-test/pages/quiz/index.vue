<template>
    <div :class="$style.QuizParameters">
        Параметры
    </div>
</template>

<script>
    export default {
        name: 'QuizParameters',

        mounted() {
            this.$store.commit('setBreadcrumbs', [
                {
                    title: 'Опросы',
                    link: '/quiz'
                },
                {
                    title: 'Параметры',
                    link: '',
                }
            ]);
        },
    };
</script>

<style lang="scss" module>
    .QuizParameters {
        padding: 2rem;
    }
</style>
