<template>
  <div class="query-pages">
    <PageTitle icon="fa fa-bullhorn" main="Abertura de Chamados" sub="Epagri" />

    <div class="query-pages-tabs">
      <b-card no-body>            
            <Query />        
      </b-card>
    </div>
  </div>
  
</template>

<script>
import PageTitle from "@/components/template/PageTitle"
// import PageTitle from "@/template/PageTitle";
import Query from "@/components/home/Query.vue";

export default {
  name: "QueryPages",
  components: { PageTitle, Query },  
}
</script>

<style>
</style>