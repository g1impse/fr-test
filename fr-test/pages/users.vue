<template>
    <div :class="$style.UsersPage"
         class="page">
        Пользователи
    </div>
</template>

<script>
    export default {
        name: 'UsersPage',

        mounted() {
            this.$store.commit('setBreadcrumbs', [
                {
                    title: 'Пользователи',
                    link: 'users'
                }
            ]);
        },
    };
</script>

<style lang="scss" module>
    .UsersPage {
        //
    }
</style>
