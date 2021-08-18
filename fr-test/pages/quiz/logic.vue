<template>
    <div :class="$style.QuizLogic">
        Логика
    </div>
</template>

<script>
    export default {
        name: 'QuizLogic',

        mounted() {
            this.$store.commit('setBreadcrumbs', [
                {
                    title: 'Опросы',
                    link: '/quiz'
                },
                {
                    title: 'Логика',
                    link: '',
                }
            ]);
        },
    };
</script>

<style lang="scss" module>
    .QuizLogic {
        padding: 2rem;
    }
</style>
