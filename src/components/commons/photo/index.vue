<template>
    <img :src="source" :alt="alt" :title="title">
</template>
<script>
import conf from '../../config'
export default {
    name: 'photo',
    props: ['src', 'alt', 'title', 'vertical', 'default'],
    computed: {
        source() {
            return this.src || (this.vertical ? conf.no_img_vertical : (this.default || conf.no_img))
        }
    }
}
</script>
