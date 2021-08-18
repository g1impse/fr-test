<template>
    <header :class="$style.TheHeader">
        <div :class="$style.wrap"
             class="container">

            <div :class="$style.left">
                <VInput
                    :class="$style.input"
                    placeholder="Поиск по системе"
                />

                <Breadcrumbs
                    v-if="$route.name !== 'index'"
                    :items="breadcrumbs"
                />
            </div>

            <div :class="$style.user">
                <div :class="$style.avatar"></div>
                <div :class="$style.userText">
                    <div :class="$style.name">
                        Alexander C.
                    </div>

                    <div :class="$style.role">
                        Администратор
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import {mapState} from 'vuex';
    import Breadcrumbs from '~/components/common/Breadcrumbs';
    import VInput from '~/components/ui/input/VInput';

    export default {
        name: 'TheHeader',

        components: {
            VInput,
            Breadcrumbs,
        },

        computed: {
            ...mapState({
                breadcrumbs: state => state.breadcrumbs,
            }),
        },
    };
</script>

<style lang="scss" module>
    .TheHeader {
        width: 100%;
        padding: 0 4rem;

        @include respond-to(md) {
            background-color: red;
        }
    }

    .wrap {
        display: flex;
        padding: 2rem 0;
    }

    .left {
        width: 50%;
    }

    .input {
        margin-bottom: 2rem;
    }

    .user {
        margin-left: auto;
        display: flex;
        align-items: center;
        height: 4rem;
    }

    .avatar {
        width: 4rem;
        height: 4rem;
        margin-right: 1rem;
        border-radius: 50%;
        background-color: $gray-dark;
    }

    .name {
        font-weight: bold;
    }

    .role {
        font-size: 1.4rem;
    }
</style>
