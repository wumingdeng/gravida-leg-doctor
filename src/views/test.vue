<template>
    <div>
    <h1>{{ msg }}</h1>
    <el-button @click.native="demoTwoPageDocument">Let's do it</el-button>
    <iframe :src="string" style="width:80%;height:400px"></iframe>
    </div>
</template>


<script>
import api from "../util/api.js";
import jsPDF from "../util/jspdf/main.js";
export default {
  data () {
    return { 
      msg: 'Use Vue 2.0 Today!',
      string:""
    }
  },
  methods: {
    demoTwoPageDocument() {
      var doc = new jsPDF();
      doc.text(20, 20, 'Hello world!');
      doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
      doc.text(20, 60, 'Do you like that?');
      this.$data.string = doc.output('datauristring');
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
