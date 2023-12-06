<template>
    <div class="container">
        <div class="image-label-container" v-if="displayedImageUrl">
            <div class="displayed-image">
                <img
                    :src="require(`@/assets/test/${displayedImageUrl}`)"
                    alt="Displayed Image"
                    class="displayed-image"
                />
            </div>

            <div class="labels-container">
                <div class="label-row">
                    <div class="label-item">
                        Body shape compatibility:
                    </div>
                    <div class="label-item">
                        {{ attribute1 }}
                    </div>
                </div>
                <div class="label-row">
                    <div class="label-item">
                        Heights:
                    </div>
                    <div class="label-item">
                        {{ attribute2 }}
                    </div>
                </div>
                <div class="label-row">
                    <div class="label-item">
                        Weights:
                    </div>
                    <div class="label-item">
                        {{ attribute3 }}
                    </div>
                </div>
                <div class="label-row">
                    <div class="label-item">
                        Size:
                    </div>
                    <div class="label-item">
                        {{ attribute4 }}
                    </div>
                </div>
                <div>
                    Comments <br/>
                    {{ comments }}
                </div>
            </div>
        </div>
        

        <div class="image-list">
            <div class="scroll-container">
                <div class="scroll-content">
                    <div v-for="image in images" :key="image.id" class="image-item">
                        <img
                            :src="require(`@/assets/test/${image.url}`)"
                            alt="Image"
                            class="image"
                            @click="displayImage(image.url)"
                        />
                    </div>
                </div>
            </div>
        </div>

        <button @click="goToHome" class="button">Home</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            images: [
                { id: 1, url: "blood.jpg" },
                { id: 2, url: "butterfly.jpg" },
                { id: 3, url: "color.jpg" },
                { id: 4, url: "quality.webp" },
                { id: 5, url: "valentines.png" },
                { id: 6, url: "yoga.webp" },
            ],
            displayedImageUrl: null,
            attribute1: "Value 1",
            attribute2: "Value 2",
            attribute3: "Value 3",
            attribute4: "Value 4",
            comments: "comments by reviewer",
        };
    },
    methods: {
        displayImage(url) {
            this.displayedImageUrl = url;
        },

        goToHome() {
            this.$router.push({ path: '/' });
        },
    },
};
</script>

<style>
.container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 100vh;
}

.image-label-container {
    display: flex;
    align-items: flex-start;
}

.displayed-image {
    margin-right: 20px; /* Added margin */
    margin-bottom: 20px;
}

.labels-container {
    display: flex;
    flex-direction: column;
}

.label-row {
    display: flex;
    margin-bottom: 20px;
}

.label-item {
    margin-right: 10px;
}

.image-list {
    width: 1000px;
    overflow-x: auto;
    white-space: nowrap;
}

.scroll-container {
    display: flex;
    flex-wrap: nowrap;
}

.scroll-content {
    display: flex;
}

.image-item {
    margin-right: 10px;
}

.image {
    width: 200px;
    height: 200px;
    object-fit: cover;
}

.displayed-image {
    display: flex;
    justify-content: center;
}

.displayed-image img {
    width: 400px;
    height: 400px;
    object-fit: cover;
}

.button {
    position: fixed; /* Fixed positioning */
    bottom: 20px; /* Position from the bottom */
    right: 20px; /* Position from the right */
    background-color: #007bff;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}
</style>
