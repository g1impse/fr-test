<template>
    <div ref="box"
         :class="[{['_light']: light, 'is-absolute': isAbsolute}]"
         class="v-scrollbox">

        <div ref="placeholder"
             class="v-scrollbox__placeholder"></div>

        <div ref="wrapper"
             class="v-scrollbox__wrapper"
             @scroll="onScroll">
            <div ref="content"
                 class="v-scrollbox__content">
                <slot />
            </div>
        </div>

        <div v-if="isYOverflowing"
             ref="yRail"
             class="c-scrollbar _vertical"
             @mousedown="onRailClick($event, 'y')">
            <div ref="yThumb"
                 class="c-scrollbar__thumb"
                 :style="{height: `${dimensions.yThumbHeight}px`, transform: yScrollPosition}"
                 @mousedown="onThumbClick($event, 'y')"></div>
        </div>

        <div v-if="isXOverflowing"
             ref="xRail"
             class="c-scrollbar _horizontal"
             @mousedown="onRailClick($event, 'x')">
            <div ref="xThumb"
                 class="c-scrollbar__thumb"
                 :style="{width: `${dimensions.xThumbWidth}px`, transform: xScrollPosition}"
                 @mousedown="onThumbClick($event, 'x')"></div>
        </div>
    </div>
</template>

<script>
    import {addResizeListener, removeResizeListener} from '../../../assets/js/utils/resizeUtils';

    export default {
        name: 'VScrollBox',

        props: {
            resizable: {
                type: Boolean,
                default: false,
            },
            light: {
                type: Boolean,
                default: false,
            },

            isAbsolute: Boolean,
        },

        data() {
            return {
                axis: {
                    x: {
                        clientAttr: 'clientX',
                        offsetAttr: 'left',
                        offsetSizeAttr: 'offsetWidth',
                        scrollSizeAttr: 'scrollWidth',
                        scrollOffsetAttr: 'scrollLeft',
                        scrollbarSize: 0,
                        scrollLeft: 0,
                        click: 0,
                    },
                    y: {
                        clientAttr: 'clientY',
                        offsetAttr: 'top',
                        offsetSizeAttr: 'offsetHeight',
                        scrollSizeAttr: 'scrollHeight',
                        scrollOffsetAttr: 'scrollTop',
                        scrollbarSize: 0,
                        scrollTop: 0,
                        click: 0,
                    },
                },
                dimensions: {
                    boxHeight: 0,
                    boxWidth: 0,
                    contentHeight: 0,
                    contentWidth: 0,
                    yRailHeight: 0,
                    yThumbHeight: 0,
                    xRailWidth: 0,
                    xThumbWidth: 0,
                },

                scrollXTicking: false,
                scrollYTicking: false,

                isYOverflowing: false,
                isXOverflowing: false,

                draggingAxis: null,
            };
        },

        computed: {
            yScrollPosition() {
                if (!this.isYOverflowing) return 0;

                let scrollPercentage =
                    this.axis.y.scrollTop / (this.dimensions.contentHeight - this.dimensions.boxHeight);

                let handleOffset = ~~(
                    (this.dimensions.yRailHeight - this.dimensions.yThumbHeight) *
                    scrollPercentage
                );

                return `translate3d(0, ${handleOffset}px, 0)`;
            },

            xScrollPosition() {
                if (!this.isXOverflowing) return 0;

                let scrollPercentage =
                    this.axis.x.scrollLeft / (this.dimensions.contentWidth - this.dimensions.boxWidth);

                let handleOffset = ~~(
                    (this.dimensions.xRailWidth - this.dimensions.xThumbWidth) *
                    scrollPercentage
                );

                return `translate3d(${handleOffset}px, 0, 0)`;
            },
        },

        mounted() {
            if (this.resizable) {
                addResizeListener(this.$refs.content, this.update);
            } else {
                this.update();
            }

            // this.update();

            // // This is required to detect horizontal scroll. Vertical scroll only needs the resizeObserver.
            // this.mutationObserver = new window.MutationObserver(this.update);

            // this.mutationObserver.observe(this.$refs.content, {
            //     childList: true,
            //     subtree: true,
            //     characterData: true
            // });
        },

        beforeDestroy() {
            this.resizable && removeResizeListener(this.$refs.content, this.update);
        },

        methods: {
            update() {
                const contentHeight = this.$refs.content.scrollHeight;
                const contentWidth = this.$refs.content.scrollWidth;
                // Determine placeholder size
                // this.$refs.placeholder.style.width = isWidthAuto
                //     ? `${wrapperOffsetWidth}px`
                //     : 'auto';
                this.$refs.placeholder.style.height = `${contentHeight}px`;

                const boxWidth = this.$refs.box.offsetWidth;
                const boxHeight = this.$refs.box.offsetHeight;

                this.isXOverflowing = contentWidth > boxWidth;
                this.isYOverflowing = contentHeight > boxHeight;

                this.$nextTick(() => {
                    this.dimensions.boxHeight = boxHeight;
                    this.dimensions.boxWidth = boxWidth;
                    this.dimensions.contentHeight = contentHeight;
                    this.dimensions.contentWidth = contentWidth;

                    if (this.isYOverflowing) {
                        this.dimensions.yRailHeight = this.$refs.yRail.offsetHeight;
                        this.dimensions.yThumbHeight = this.getScrollbarSize('y');
                    }

                    if (this.isXOverflowing) {
                        this.dimensions.xRailWidth = this.$refs.xRail.offsetWidth;
                        this.dimensions.xThumbWidth = this.getScrollbarSize('x');
                    }
                });
            },

            // hideNativeScrollbar() {
            //     this.offsetEl.style[this.isRtl ? 'left' : 'right'] =
            //         this.axis.y.isOverflowing || this.axis.y.forceVisible
            //             ? `-${this.scrollbarWidth}px`
            //             : 0;

            //     this.offsetEl.style.bottom =
            //         this.axis.x.isOverflowing || this.axis.x.forceVisible
            //             ? `-${this.scrollbarWidth}px`
            //             : 0;
            // },

            getScrollbarSize(axis = 'y') {
                if ((axis === 'y' && this.isYOverflowing) || (axis === 'x' && this.isXOverflowing)) {
                    const contentSize = this.$refs.content[this.axis[axis].scrollSizeAttr];
                    const trackSize =
                        axis === 'y' ? this.$refs.yRail.offsetHeight : this.$refs.xRail.offsetWidth;

                    let scrollbarRatio = trackSize / contentSize;

                    let scrollbarSize = Math.max(~~(scrollbarRatio * trackSize), 20);

                    return scrollbarSize;
                } else {
                    return 0;
                }
            },

            onScroll() {
                if (!this.scrollXTicking && this.isXOverflowing) {
                    requestAnimationFrame(() => {
                        this.axis.x.scrollLeft = this.$refs.wrapper.scrollLeft;
                        this.scrollXTicking = false;
                    });
                    this.scrollXTicking = true;
                }

                if (!this.scrollYTicking && this.isYOverflowing) {
                    requestAnimationFrame(() => {
                        this.axis.y.scrollTop = this.$refs.wrapper.scrollTop;
                        this.scrollYTicking = false;
                    });
                    this.scrollYTicking = true;
                }
            },

            onThumbClick(e, axis = 'y') {
                if (e.ctrlKey || e.button === 2) return;
                e.stopImmediatePropagation();

                this.axis[axis].click =
                    e.currentTarget[this.axis[axis].offsetSizeAttr] -
                    (e[this.axis[axis].clientAttr] -
                        e.currentTarget.getBoundingClientRect()[this.axis[axis].offsetAttr]);
                this.draggingAxis = axis;
                document.addEventListener('mousemove', this.onMouseMove);
                document.addEventListener('mouseup', this.onMouseUp);
                document.onselectstart = () => false;
            },

            onMouseMove(e) {
                const prevPage = this.axis[this.draggingAxis].click;
                if (!prevPage) return;

                const rail = this.draggingAxis === 'y' ? this.$refs.yRail : this.$refs.xRail;
                const thumb = this.draggingAxis === 'y' ? this.$refs.yThumb : this.$refs.xThumb;

                const offset =
                    (rail.getBoundingClientRect()[this.axis[this.draggingAxis].offsetAttr] -
                        e[this.axis[this.draggingAxis].clientAttr]) *
                    -1;
                const thumbClickPosition =
                    thumb[this.axis[this.draggingAxis].offsetSizeAttr] - prevPage;
                const thumbPositionPercentage =
                    ((offset - thumbClickPosition) * 100) /
                    rail[this.axis[this.draggingAxis].offsetSizeAttr];

                this.$refs.wrapper[this.axis[this.draggingAxis].scrollOffsetAttr] =
                    (thumbPositionPercentage *
                        this.$refs.wrapper[this.axis[this.draggingAxis].scrollSizeAttr]) /
                    100;
            },

            onMouseUp() {
                this.axis[this.draggingAxis].click = 0;
                this.draggingAxis = null;
                document.removeEventListener('mousemove', this.onMouseMove);
                document.removeEventListener('mouseup', this.onMouseUp);
                document.onselectstart = null;
            },

            onRailClick(e, axis = 'y') {
                const offset = Math.abs(
                    e.target.getBoundingClientRect()[this.axis[axis].offsetAttr] -
                    e[this.axis[axis].clientAttr],
                );

                const rail = axis === 'y' ? this.$refs.yRail : this.$refs.xRail;
                const thumb = axis === 'y' ? this.$refs.yThumb : this.$refs.xThumb;
                const thumbHalf = thumb[this.axis[axis].offsetSizeAttr] / 2;

                const thumbPositionPercentage =
                    ((offset - thumbHalf) * 100) / rail[this.axis[axis].offsetSizeAttr];

                this.$refs.wrapper[this.axis[axis].scrollOffsetAttr] =
                    (thumbPositionPercentage * this.$refs.wrapper[this.axis[axis].scrollSizeAttr]) /
                    100;
            },
        },
    };
</script>

<style lang="scss">
    .v-scrollbox {
        position: relative;
        overflow: hidden;

        &.is-absolute {
            position: absolute;
        }

        &__wrapper {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: 0;
            height: 100%;
            width: auto;
            max-width: 100%;
            max-height: 100%;
            box-sizing: border-box;
            scrollbar-width: none;
            -ms-overflow-style: none;
            overflow: auto;

            &::-webkit-scrollbar {
                width: 0;
                height: 0;
            }
        }

        &__placeholder {
            max-height: 100%;
            max-width: 100%;
            width: 100%;
            pointer-events: none;
        }

        &._light {
            .c-scrollbar {
                width: 1px;
                background-color: rgba(202, 202, 200, .48);

                &__thumb {
                    background-color: $border;
                    border-radius: 0;
                }

                &._vertical {
                    .c-scrollbar__thumb {
                        right: 0;
                        width: 1px;
                    }
                }

                &._horizontal {
                    .c-scrollbar__thumb {
                        bottom: 0;
                        height: 1px;
                    }
                }
            }
        }
    }

    .c-scrollbar {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 1;
        width: 6px;
        overflow: hidden;

        &._horizontal {
            left: 0;

            .c-scrollbar__thumb {
                bottom: 1px;
                left: 0;
                height: 4px;
            }
        }

        &._vertical {
            top: 0;

            .c-scrollbar__thumb {
                right: 1px;
                top: 0;
                width: 4px;
            }
        }

        &__thumb {
            position: absolute;
            background-color: $border;
            border-radius: 4px;
        }
    }
</style>
