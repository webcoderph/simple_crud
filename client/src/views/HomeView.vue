<template>
  <div class="home text-gray-50">
    <PostsList :posts="posts" v-bind:deletePost="deletePost"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PostsList from '@/components/PostsList.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref } from 'vue';

export default {
  components: {
    PostsList,
  },
  setup() {
    const posts = ref([]);
    async function getPosts() {
      const baseUrl = `${process.env.VUE_APP_API_BASEURL}/posts`;
      try {
        const response = await axios.get(baseUrl, { 'Content-Type': 'application/json' });
        posts.value = response.data;
      } catch (error) {
        console.log(error);
      }
    }

    getPosts();

    function deletePost(id) {
      console.log(id);
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: 'Don\'t save',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const deletePostUrl = `${process.env.VUE_APP_API_BASEURL}/posts/${id}`;
            const response = await axios.delete(deletePostUrl, { headers: { 'Content-Type': 'application/json' } });
            if (response.status === 200 || response.status === 201) {
              Swal.fire('Post Deleted!', '', 'success');
              setTimeout(() => {
                getPosts();
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
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }

    return {
      posts,
      deletePost,
    };
  },
};
</script>
