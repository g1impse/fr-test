<template>
    <div :class="$style.TheSidebar">
        <nuxt-link
            :class="$style.home"
            to="/">
            Главная
        </nuxt-link>

        <div :class="$style.nav">
            <nuxt-link
                v-for="(item, ind) in menu"
                :key="ind"
                :to="item.link"
                :class="$style.item">
                <fa :icon="item.icon"
                    :class="$style.icon" />
                <div :class="$style.text">
                    {{ item.name }}
                </div>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TheSidebar',

        data() {
            return {
                menu: [
                    {
                        name: 'Опросы',
                        icon: 'list-alt',
                        link: '/quiz',
                    },
                    {
                        name: 'Пользователи',
                        icon: 'users',
                        link: '/users',
                    },
                    {
                        name: 'Черные списки',
                        icon: 'ban',
                        link: '/blacklist',
                    },
                    {
                        name: 'Колл-центр',
                        icon: 'phone-alt',
                        link: '/call-center',
                    },
                ],
            };
        },
    };
</script>

<style lang="scss" module>
    .TheSidebar {
        width: 15rem;
        height: 100vh;
        border-right: 1px solid $border;
        padding: 1rem;
        text-align: center;
    }

    .home {
        display: block;
        font-weight: bold;
        text-align: center;
        margin-top: 1.5rem;
        margin-bottom: 3rem;
    }

    .item {
        display: block;
        padding: 1rem;
        text-align: center;
        transition: all $default-transition;
        border-radius: 4px;
        margin-bottom: 1rem;
        border: 1px solid transparent;
        cursor: pointer;

        &:hover {
            background-color: $gray;
        }

        &:global(.is-active) {
            border-color: $green;
            color: $green;
        }
    }

    .icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .text {
        font-size: 1.4rem;
    }

</style>
