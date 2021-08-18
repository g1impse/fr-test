<template>
    <div :class="$style.body">
<!--        -->
        <TheSidebar />

        <main :class="$style.main">
            <TheHeader />
            <nuxt />
        </main>

<!--        <TheFooter />-->
        <TheModal />
    </div>
</template>

<script>
    import TheHeader from '~/components/layout/TheHeader';
    // import TheFooter from '~/components/layout/TheFooter';
    import TheSidebar from '~/components/layout/TheSidebar';
    import TheModal from '~/components/layout/TheModal';

    export default {
        components: {
            TheHeader,
            // TheFooter,
            TheSidebar,
            TheModal,
        },
    };
</script>

<style lang="scss" module>
    .body {
        display: flex;
    }

    .main {
        flex: 1;
        min-height: calc(100vh - #{$footer-h});
    }
</style>
