<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="about">
    <PostForm v-bind:post="post" v-bind:submitForm="addPost" v-bind:formTitle="formTitle" />
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PostForm from '@/components/PostForm.vue';

export default {
  components: { PostForm },
  setup() {
    const post = ref({
      title: '',
      content: '',
    });
    const baseUrl = `${process.env.VUE_APP_API_BASEURL}/posts/create`;
    const router = useRouter();
    const formTitle = 'Add';

    async function addPost() {
      try {
        const response = await axios.post(baseUrl, { title: post.value.title, content: post.value.content }, { 'Content-Type': 'application/json' });
        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Post save!',
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            router.push({ name: 'home' });
          }, 1500);
        }
      } catch (error) {
        if (error) {
          // eslint-disable-next-line no-alert
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'Oops something went wrong! Please try again.',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }

    return {
      post,
      addPost,
      formTitle,
    };
  },
};
</script>
