<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4 flex-col">
    <div class="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
      <div>
        <img
          :src="aiRobot"
          alt=""
          class="mx-auto w-24 h-24 mb-4" />
        <h1 class="text-2xl md:text-3xl font-semibold mb-4 text-center">
          Welcome to
          <strong
            class="font-bold bg-gradient-to-r from-blue-500 to-blue-400 text-transparent bg-clip-text"
            >Cortexa</strong
          >
          AI Chatbot
        </h1>
      </div>
      <LoginForm
        v-if="loginVisible"
        @toggle-forms="toggleForms"></LoginForm>
      <CreateForm
        v-else
        @toggle-forms="toggleForms"></CreateForm>
    </div>
  </div>
</template>

<script setup leng="ts">
import { ref } from "vue";
import aiRobot from "../assets/ai-robot.png";
import LoginForm from "../components/LoginForm.vue";
import CreateForm from "../components/CreateForm.vue";

const loginVisible = ref(true);

function toggleForms() {
  loginVisible.value = !loginVisible.value;
}
// async function createUser() {
//   if (!name.value || !email.value) {
//     error.value = "Name and Email are required";
//     return;
//   }

//   loading.value = true;
//   error.value = "";

//   try {
//     const { data } = await axios.post(
//       `${import.meta.env.VITE_API_URL}/register-user`,
//       {
//         name: name.value,
//         email: email.value,
//       }
//     );

//     userStore.setUser({
//       userId: data.userId,
//       name: data.userId,
//       email: data.email,
//     });

//     router.push("/chat");
//   } catch (err) {
//     error.value = "Something went wrong... Please try again";
//   } finally {
//     loading.value = false;
//   }
// }
</script>
