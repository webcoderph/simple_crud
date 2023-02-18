<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="about">
    <PostForm v-bind:post="post" v-bind:submitForm="updatePost" v-bind:formTitle="formTitle" />
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import PostForm from '@/components/PostForm.vue';

export default {
  components: { PostForm },
  setup() {
    const post = ref({
      title: '',
      content: '',
    });
    const router = useRouter();
    const route = useRoute();
    const { id } = route.params;
    const updatePostUrl = `${process.env.VUE_APP_API_BASEURL}/posts/update/${id}`;
    const formTitle = 'Update';

    onMounted(() => {
      async function getCurrentPost() {
        const getPostUrl = `${process.env.VUE_APP_API_BASEURL}/posts/${id}`;
        const response = await axios.get(getPostUrl, { 'Content-Type': 'application/json' });
        post.value.title = response.data.title;
        post.value.content = response.data.content;
      }

      getCurrentPost();
    });

    async function updatePost() {
      try {
        const response = await axios.put(updatePostUrl, { title: post.value.title, content: post.value.content }, { 'Content-Type': 'application/json' });
        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Post updated!',
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            router.push({ name: 'home' });
          }, 1500);
        }
      } catch (error) {
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: 'Oops something went wrong! Please try again.',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    }

    return {
      post,
      updatePost,
      formTitle,
    };
  },
};
</script>
