<template>
  <section class="mt-8">
    <Spinner
      v-if="loading"
      class="mb-4" />

    <form
      @submit.prevent="sendRequest"
      class="space-y-4 fade-slide-in">
      <h2 class="text-2xl font-semibold text-center mb-4 pb-1 relative">
        Login
        <span
          class="absolute bottom-0 left-0 right-0 mx-auto w-16 h-0.5 bg-blue-400 rounded-full"></span>
      </h2>

      <div class="relative w-full mt-4">
        <input
          type="text"
          v-model="email.value"
          :class="[
            'w-full p-3 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 ',
            email.invalid
              ? 'border border-red-400 focus:ring-red-400 shadow-lg shadow-red-400/20'
              : 'bg-gray-700 focus:ring-blue-500',
          ]"
          @blur="email.invalid = false"
          placeholder="Enter your email" />
        <i
          class="fas fa-envelope absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
      </div>

      <button
        type="submit"
        class="w-full p-3 bg-blue-600 rounded-md font-medium hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        :disabled="loading">
        {{ loading ? "Logging in..." : "Start Chat" }}
      </button>

      <div class="text-center mt-4">
        <button
          type="button"
          class="text-sm text-blue-400 cursor-pointer hover:underline hover:text-blue-300"
          @click="handleEmit">
          Don't have an account?
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import Spinner from "./Spinner.vue";
import axios from "axios";
import callToast from "../services/callToast.js";
import checkEmail from "../services/checkEmail.js";

const userStore = useUserStore();
const router = useRouter();
const emit = defineEmits(["toggle-forms"]);

const email = ref({
  value: "",
  invalid: false,
});

const loading = ref(false);

const sendRequest = async () => {
  email.value.invalid = false;

  const rawEmail = email.value.value.trim();

  //  Email check
  if (!checkEmail(rawEmail)) {
    email.value.invalid = true;
    callToast("Invalid email. Please enter a valid email.", "warning");
    return;
  }

  loading.value = true;

  // Covnert email to check if user exists in NEON - converted email is userId in my base
  const convertedEmail = rawEmail.replace(/[^a-zA-Z0-9_-]/g, "_");

  try {
    // check if user exists
    const checkUser = await axios.post(
      `${import.meta.env.VITE_API_URL}/check-user`,
      { userId: convertedEmail }
    );

    const isExisting = checkUser.data.existingUser;
    if (!isExisting || isExisting.length === 0) {
      callToast("User does not exist. Please create a new user.", "warning");
      return;
    }

    const name = isExisting[0].name;

    // Logging user
    const registerRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/register-user`,
      {
        name,
        email: rawEmail,
      }
    );

    const userData = registerRes.data;

    userStore.setUser({
      userId: userData.userId,
      name: userData.name,
      email: userData.email,
    });

    router.push("/chat");
  } catch (error) {
    console.error("Error while logging in...", error);
    callToast("Something went wrong during login.", "error");
  } finally {
    loading.value = false;
  }
};

function handleEmit() {
  emit("toggle-forms");
}
</script>
