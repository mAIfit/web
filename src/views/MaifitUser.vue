
<template>
  <div class="container">
    <img src="@/assets/logo.png" alt="Logo" class="logo" />
    <h1 class="title">체형예측에 사용할 본인의 사진을 올려주세요. (jpg only)</h1>
      <div class="image-upload">
        <input type="file" accept="image/jpeg" @change="handleImageUpload" />
        <div v-if="selectedImage" class="preview">
          <img :src="selectedImage" alt="Selected Image" />
        </div>
      </div>
    <div class="input-fields">
      <input type="string" v-model="sex" placeholder="성별" />
      <input type="number" v-model="height" placeholder="키(cm)" />
    </div>
    <button class="next-button" @click="uploadImage">다음</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedImage: null,
      sex: null,
      height: null
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
    },
    uploadImage() {
      // Convert the selected image, sex and height to FormData
      const formData = new FormData();
      formData.append('sex', this.sex);
      formData.append('height', this.height);
      formData.append('image', this.selectedImage);

      // Send the data to the server using POST request
      fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the server
          console.log(data);
          // Redirect to the next page
          this.$router.push('/maifit/loading');
        })
        .catch(error => {
          console.error(error);
        });
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
  width: 512px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
}

.image-upload {
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 200px;
  text-align: center;
}

.preview {
  /* 크기를 일치시킴 */
  width: 50%;
  height: 50%;
  overflow: hidden;
  margin: auto;
  position: relative; /* 추가 */
  z-index: 1;
}

.preview img {
  max-width: 100%;
  max-height: 100%;
  margin-top: 50px;
}

.input-fields {
  display: flex;
  flex-direction: column; /* 위아래로 정렬하기 위해 flex-direction: column; 추가 */
  align-items: center; /* 수직 정렬을 위해 align-items 추가 */
  margin-top : 580px;
  position: absolute;
}

.input-fields input {
  padding: 10px 20px;
  margin-right: 20px;
}

.next-button {
  padding: 10px 20px;
  font-size: 16px;
  margin-left: 700px;
  margin-top: 550px;
  position: absolute;
}
</style>