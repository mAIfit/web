<template>
  <div class="container">
    <img src="assets/logo.png" alt="Logo" class="logo" />
    <h1 class="title">체형예측에 사용할 본인의 사진을 올려주세요. (jpg only)</h1>
    <div class="big-box">
      <div class="image-upload">
        <input type="file" accept="image/jpeg" @change="handleImageUpload" />
        <div v-if="selectedImage" class="preview">
          <img :src="selectedImage" alt="Selected Image" />
        </div>
      </div>
    </div>
    <button class="next-button">다음</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedImage: null
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 800px;
  height: 250px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
}

.big-box {
  width: 500px;
  height: 200px;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 20px;
}

.image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  margin-left: 100px;
  margin-bottom: 100px;
}

.preview {
  margin-top: 20px;
}

.next-button {
  padding: 10px 20px;
  font-size: 16px;
  margin-left: 500px;
}
</style>
