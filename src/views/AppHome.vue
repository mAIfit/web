<template>
    <div>
        <h1>Welcome to Home!</h1>
        <p>{{ title }}</p>
        <p>{{ description }}</p>
        <input type="text" v-model="input" />
        <button @click=changeTitle>Change Title</button>
        <div>
            <button>
                <router-link to="/maifit/home">Go to Maifit Home</router-link>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AppHome',
    data() {
        return {
            title: 'Jaewoong Jung',
            description: 'This is the home page.',
            input: 'default value'
        }
    },
    methods: {
        changeTitle() {
            this.title = this.input
        }
    }
}
</script>