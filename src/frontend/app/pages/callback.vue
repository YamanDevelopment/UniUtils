<!-- pages/callback.vue -->
<template>
  <div>Processing authentication...</div>
</template>

<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { useRouter } from "vue-router";

const { handleRedirectCallback, user, isAuthenticated } = useAuth0();
const router = useRouter();

onMounted(async () => {
  try {
    // Handle the callback from Auth0
    await handleRedirectCallback();

    // Ensure the user is authenticated before proceeding
    if (isAuthenticated.value) {
      const userData = user.value;
      await saveUserToDatabase(userData);

      // Redirect to dashboard after successful authentication
      router.push("/dashboard");
    } else {
      // Handle case where the user is not authenticated
      console.error("User not authenticated");
      router.push("/");
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    // Fallback redirect in case of an error
    router.push("/dashboard");
  }
});

async function saveUserToDatabase(userData) {
  try {
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  } catch (error) {
    console.error("Error saving user to database:", error);
  }
}
</script>
