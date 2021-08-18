<template>
    <transition name="form-appear"
                @after-enter="$emit('after-enter')"
                @after-leave="$emit('after-leave')">
        <div v-if="visible"
             :class="$style.FormExample1">
            <div :class="$style.wrap">
                <h5 :class="$style.title">
                    Form Example 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos explicabo rerum expedita aliquid eveniet inventore, quod officiis vitae, alias facere qui illum quia magnam quisquam voluptas a ipsam ad nesciunt. Iusto, omnis assumenda deserunt iste, fuga commodi architecto nam aperiam molestiae ab eligendi amet facilis suscipit porro laboriosam vero! Quisquam asperiores animi vitae dignissimos ratione, officia sunt? Adipisci, incidunt cumque eius expedita dolorum doloremque praesentium beatae, ea aperiam assumenda porro blanditiis quisquam, nisi dolores! Tempore soluta amet animi quibusdam architecto magnam sit dolor odit fuga rerum. Consequatur laborum odit perferendis nulla ea itaque quisquam necessitatibus tempore modi dicta earum iste alias amet doloribus nostrum velit, explicabo incidunt fuga sint quasi quaerat recusandae maiores cumque. Rerum illo voluptates necessitatibus libero ipsa eveniet eligendi at, obcaecati praesentium dolores a magnam minima. Harum illum neque placeat consectetur exercitationem sequi temporibus, quo, dignissimos nobis quod sunt obcaecati laboriosam nesciunt deleniti natus numquam debitis explicabo fugiat cupiditate? Iure quidem vitae, magnam totam fugiat, nostrum nam excepturi officia impedit fuga debitis placeat soluta provident amet consequatur cum, enim doloribus. Temporibus nostrum et commodi laudantium dolore excepturi expedita dignissimos. Facere, quia illum. Optio doloremque possimus illo impedit quasi quod mollitia sed hic! Sint odit corrupti illum aspernatur pariatur deleniti qui et enim similique illo, eos earum tenetur reiciendis temporibus recusandae architecto ut alias ea impedit veritatis molestiae incidunt laudantium corporis! Sapiente quis explicabo veniam nemo accusantium earum culpa incidunt autem laborum, quisquam perspiciatis sequi deserunt est necessitatibus, facere beatae tempora quo, quod nobis? Voluptas quia dignissimos, rem dolore exercitationem a eligendi veniam provident voluptates, minus optio hic deleniti corporis, velit temporibus laborum rerum excepturi aspernatur at! Unde excepturi, saepe inventore aspernatur dignissimos laborum pariatur nostrum dolorum nulla dicta quo quis libero harum nam iste architecto molestiae facere natus debitis quia similique voluptate? Minus quos quod nam nobis?
                </h5>

                <button :class="$style.btn"
                        @click="openModal">
                    Open Example 2
                </button>

            </div>
        </div>
    </transition>
</template>

<script>
    import FormExample2 from '~/components/layout/modals/FormExample2';

    export default {
        props: {
            submited: {
                type: Boolean,
                default: false
            },
            visible: Boolean
        },

        methods: {
            openModal() {
                this.$modal.open(FormExample2, {classList: 'is-article'});
            }
        }
    };
</script>

<style lang="scss" module>
    .FormExample1 {
        position: absolute;
        top: 0;
        right: 0;
        padding: 16px;
        height: 100%;
        pointer-events: none;

        &:global(.form-appear-enter-active) {
            transition: transform .8s;
        }

        &:global(.form-appear-leave-active) {
            transition: transform .4s;
        }

        &:global(.form-appear-enter),
        &:global(.form-appear-leave-to) {
            transform: translateX(110%);
        }
    }

    .wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 460px;
        background-color: #fff;
        pointer-events: all;
        border-radius: 4px;
    }

    .title {
        font-size: 24px;
    }

    .btn {
        margin-top: 16px;
        width: 200px;
        height: 60px;
        background-color: red;
        position: fixed;
        bottom: 20px;
        color: #fff;
    }

</style>
