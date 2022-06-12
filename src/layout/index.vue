<template>
  <t-layout>
    <Aside />
    <t-layout class="s-layout">
      <Header />
      <section class="inner-layout">
        <Content />
        <Footer />
      </section>
    </t-layout>
  </t-layout>
</template>

<script setup lang="ts">
import Aside from './components/Aside.vue';
import Header from './components/Header.vue';
import Content from './components/Content.vue';
import Footer from './components/Footer.vue';
</script>

<style lang="scss">
@import './index.scss';
</style>
