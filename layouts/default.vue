<template>
    <div class="container">
        <Navbar/>
        <main>
            <div >
                <nuxt/>
            </div>
        </main>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
    components: {
        Navbar
    }
}
</script>

<style scoped>
    .container{
        background-color: #131e2a!important;
        padding: 20px;
    }
</style>