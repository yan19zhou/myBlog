<template>
    <div>
        <child ref="msg"></child>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: ''
            }
        },
     methods: {
         getMessage(m) {
             this.message = m
         }
     },   
    }
</script>

<style lang="scss" scoped>

</style>