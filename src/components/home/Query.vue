<template>
    <div class="query">        
        
        <b-form>

            <b-row class="query">
                    <b-col class="query-col" md="12" sm="12">
                        <FlashMessage></FlashMessage>
                    </b-col>                            
            </b-row>

            <b-row class="query">                  
                
                <b-col class="query-col" md="4" sm="12">                    
                    <b-form-group label="Tipo de Chamado:" label-for="lotacao-lista">
                        <b-form-select id="lotacao-lista" :options="lotacoes" v-model="lotacao.CD_UNORG"/>
                    </b-form-group>                      
                </b-col>                           
                
            </b-row>            

            <b-row class="query">
                <b-col class="query-col" md="4" sm="12">
                    <b-button @click="query" variant="primary" >
                        <b-spinner small class="mr-2" v-show="loading" role="status"></b-spinner>Consultar</b-button>                    
                        <b-button @click="resetForm()" class="ml-2">Limpar</b-button>
                </b-col>            
                
            </b-row>
            
            
        </b-form>        
    </div>
</template>

<script>

import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators"
import DataTable from "vue-materialize-datatable";

export default {
    name: 'Consulta',
    mixins: [validationMixin],  
    components: {"datatable": DataTable
    }, 
    
    data: function() {
        return {        
            consulta: false,
            consultas: [{NM_COMPLETO_COLAB: '', DS_COLABCAR: '',NM_UNORG: '', DT_PRESTACAO_CONTA_FORMATADO: '',DS_MATDIVERSO:'', VL_TOTAL_DOCFISCAL: ''}],       
            tableColumns1: [
                {
                    label: 'Nome Colaborador',
                    field: 'NM_COMPLETO_COLAB',
                    numeric: false,
                    html: false
                },
                {
                    label: 'Cargo',
                    field: 'DS_COLABCAR',
                    numeric: false,
                    html: false
                },
                {
                    label: 'Lotação',
                    field: 'NM_UNORG',
                    numeric: false,
                    html: false
                },
                {
                    label: 'Dt. Prestação',
                    field: 'DT_PRESTACAO_CONTA_FORMATADO',
                    numeric: false,
                    html: false
                },
                {
                    label: 'Descrição',
                    field: 'DS_MATDIVERSO',
                    numeric: false,
                    html: false
                },
                {
                    label: 'Valor R$',
                    field: 'VL_TOTAL_DOCFISCAL',
                    numeric: true,
                    html: false
                },
                
            ],                                   
            loading : false,       
            lotacao : {},
            lotacoes: [],     
            colaborador : {},       
            colaboradores: [],  
            dtinicial: null,
            dtfinal: null,                      
            form: {                 
                inicial: null,
                final: null,                
                },            
        }
    },
    validations: {
        form: {
                inicial: { required },
                final: { required },                
            }
    },
    methods: {  

        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },

        resetForm() {
            document.getElementById('lotacao-lista').value = null
            document.getElementById('colaborador-lista').value = null
            this.consultas= [{NM_COMPLETO_COLAB: '', DS_COLABCAR: '',NM_UNORG: '', DT_PRESTACAO_CONTA_FORMATADO: '',DS_MATDIVERSO:'', VL_TOTAL_DOCFISCAL: ''}],       
            this.lotacao.CD_UNORG = undefined
            this.colaborador.CD_COLABORADOR = undefined
            this.form = {
                    final: null,
                    inicial: null,                    

            }
            this.$nextTick(() => {
                this.$v.$reset()
            })
        },

        loadLotacoes() {
            const url = `${baseApiUrl}/lotacao`
            axios.get(url)
            .then(res => {
                this.lotacoes = res.data.map(lotacao => {
                    return { value: lotacao.CD_UNORG, text: lotacao.NM_UNORG }
                })
            })            
            
        },     

        loadColaboradores() {
            const url = `${baseApiUrl}/colaborador`
            this.loading = true;
            axios.get(url)
            .then(res => {
                this.colaboradores = res.data.map(colaborador => {
                    return { value: colaborador.CD_COLABORADOR, text: colaborador.NM_COMPLETO_COLAB }
                
                })
                this.loading = false
            })
            
        },         
        
        query() {
            this.consultas= [{NM_COMPLETO_COLAB: '', DS_COLABCAR: '',NM_UNORG: '', DT_PRESTACAO_CONTA_FORMATADO: '',DS_MATDIVERSO:'', VL_TOTAL_DOCFISCAL: ''}]                                       
            this.$v.form.$touch();             
            if (this.$v.form.$anyError) {                
                this.loading = false
                return
            } else {                                

                this.dtfinal = new Date(this.form.final)        
                this.dtinicial = new Date(this.form.inicial)        
                
                this.dtinicial.setDate(this.dtinicial.getDate() + 1);
                this.dtfinal.setDate(this.dtfinal.getDate() + 1); 

                
                if (this.dtinicial > this.dtfinal) {   

                    this.flashMessage.error({
                            time: 3500,
                            title: 'Data final maior que a data inicial', 
                            message: 'A data final deve ser maior que a data inicial',
                            icon: false,
                            clickable: false
                    });                    
                    
                } else {
                    this.loading = true                                        
                    const url = `${baseApiUrl}/consulta/${this.lotacao.CD_UNORG}/${this.colaborador.CD_COLABORADOR}/${this.dtinicial}/${this.dtfinal}`                                     
                    axios.get(url)                    
                    .then(res => {this.consultas = res.data
                                  this.loading = false   
                                  //console.log(this.consultas.length)                               
                                  if (this.consultas.length == 0){                                      
                                      this.consultas= [{NM_COMPLETO_COLAB: '', DS_COLABCAR: '',NM_UNORG: '', DT_PRESTACAO_CONTA_FORMATADO: '',DS_MATDIVERSO:'', VL_TOTAL_DOCFISCAL: ''}]
                                      this.flashMessage.warning({
                                            time: 3500,
                                            title: 'Consulta vazia', 
                                            message: 'Não existem registros com estes filtros',
                                            icon: false,
                                            clickable: false
                                        });
                                   } 
                                   })                   
                    .catch(showError)
                }        

                                
            }            
        },           

    },    
    mounted() {         
        this.loadColaboradores()
        this.loadLotacoes()  
    },
}
</script>

<style>

 .query{
    padding: 2px;
    
 } 

</style>
