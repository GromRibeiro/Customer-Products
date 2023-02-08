<template>
  <div>
    <Navbar :logo="logo_src" :alt="app_name" />
    <div>
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>
<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default {
  data: function() {
    return {
      logo_src: "/img/logo.png",
      app_name: "customers products"
    }
  },
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
  * {
    font-family: Helvetica,serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }


  h1 {
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
  }
</style>
