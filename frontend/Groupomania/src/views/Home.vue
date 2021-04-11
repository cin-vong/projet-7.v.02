<template>
  <div class="signup">
      <h1> Bienvenue !</h1>
      <img alt="Vue logo" src="../assets/logo.png">
    <AccueilSignup/>
  </div>
</template>

<script>
import AccueilSignup from '@/components/AccueilSignup.vue';
export default {
  name: 'Home',
  components: {
    AccueilSignup
  },
}
</script>