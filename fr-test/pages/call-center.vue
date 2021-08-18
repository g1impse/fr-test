<template>
    <div :class="$style.CallCenterPage"
         class="page">
        Колл-центр
    </div>
</template>

<script>
    export default {
        name: 'CallCenterPage',

        mounted() {
            this.$store.commit('setBreadcrumbs', [
                {
                    title: 'Колл-центр',
                    link: 'call-center'
                }
            ]);
        },
    };
</script>

<style lang="scss" module>
    .CallCenterPage {
        //
    }
</style>
