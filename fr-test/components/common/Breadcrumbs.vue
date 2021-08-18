<template>
    <ul :class="$style.Breadcrumbs">
        <nuxt-link
            to="/">
            <fa icon="home"
                :class="$style.icon" />
        </nuxt-link>
        <fa icon="long-arrow-alt-right"
            :class="$style.arrow" />
        <li v-for="item in items"
            :key="item.title"
            :class="$style.item">
            <nuxt-link :to="item.link"
                       :class="[$style.link, {[$style._disabled]: !item.link}]">
                {{ item.title }}
            </nuxt-link>
            <fa icon="long-arrow-alt-right"
                :class="$style.arrow" />
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'Breadcrumbs',

        props: {
            items: {
                type: Array,
                default: () => ([]),
            },
        },
    };
</script>

<style lang="scss" module>
    .Breadcrumbs {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        font-size: 1.4rem;
        line-height: 1.67;

        @include respond-to(xs) {
            font-size: 10px;
            line-height: 2;
        }
    }

    .item {
        display: flex;
        align-items: center;

        &:last-child {
            pointer-events: none;
            opacity: .5;
        }

        &:last-child .arrow {
            display: none;
        }
    }

    .icon {
        color: $black;
        transition: all $default-transition;

        &:hover {
            color: $green;
        }
    }

    .link {
        color: $black;
        transition: color $default-transition;

        &:hover {
            color: $green;
        }

        &._disabled {
            pointer-events: none;
            opacity: .5;
        }
    }

    .arrow {
        margin: 0 1rem;
    }
</style>
