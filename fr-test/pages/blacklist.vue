<template>
    <div :class="$style.BlackListPage"
         class="page">
        Черный список
    </div>
</template>

<script>
    export default {
        name: 'BlackListPage',

        mounted() {
            this.$store.commit('setBreadcrumbs', [
                {
                    title: 'Черный список',
                    link: 'blacklist'
                }
            ]);
        },
    };
</script>

<style lang="scss" module>
    .BlackListPage {
        //
    }
</style>
