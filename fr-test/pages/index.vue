<template>
    <div :class="$style.HomePage"
         class="page">
        <div class="container">
            Главная
        </div>
    </div>
</template>

<script>
    import FormExample1 from '~/components/layout/modals/FormExample1';

    export default {
        name: 'HomePage',

        methods: {
            openModal() {
                this.$modal.open(FormExample1);
            },
        },
    };
</script>

<style lang="scss" module>
    .HomePage {
        //
    }
</style>
