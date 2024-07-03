sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("campbrasileiro.controller.Main", {
        onInit: function () {

            var dadosGerais = {};
            var classificacao = {};
            var partidas = {};

            //3 modelos - 1 para cada objeto
            //variavel dentro do parenteses substitui o comando setData
            var dadosModel = new JSONModel(dadosGerais);
            var classificacaoModel = new JSONModel(classificacao);
            var partidasModel = new JSONModel(partidas);

            //atribuimos 3 modelos a tela - view
            this.getView().setModel(dadosModel, "ModeloDadosGerais");
            this.getView().setModel(classificacaoModel, "ModeloClassificacao");
            this.getView().setModel(partidasModel, "ModeloPartidas");


            this.buscarDadosGerais();
            this.buscarClassificacao();

/*
            //vamos criar um modelo
            //antes, as variaveis que vao no modelo
            var dadosGerais = {
                rodada: '13a',
                campeonato: 'Brasileirao 2024 - FioriNET'

            };

            //agora vamos criar o modelo
            var dadosModel = new JSONModel();
            dadosModel.setData(dadosGerais);

            //obter uma isntancia da tela
            var view = this.getView();
            view.setModel(dadosModel,"ModeloDadosGerais");
*/

            //variaveis

            //variaveis de texto
            let time = "Cruzeiro";
            //variavel numerica
            let pontos = 20;
            //listas ou arrays
            let top4 = [ "Flamengo", "Bahia", "Botafogo", "Palmeiras"];

            //objetos
           /* let meuTime = {
                nome: "Cruzeiro",
                pontos: 20,
                artilheiros: ["Rafa Silva", "Matheus Pereira"],
                adicionarPontos: function(pontosNovos){
                    this.pontos =  this.pontos + pontosNovos;
                }
            };*/

            //meuTime.adicionarPontos(3);

        },

        buscarDadosGerais: function(){


            //obter o model a ser atualizado
            var dadosModel2 = this.getView().getModel("ModeloDadosGerais");

            const configuracoes = {
                url : "https://api.api-futebol.com.br/v1/campeonatos/10",
                method : "GET",
                async :  true,
                crossDomain : true,
                headers : {
                    "Authorization": "Bearer live_fcd430ae362f04f041adba062b3e45"
                }
            };

            //fazemos a chamada a API
            $.ajax(configuracoes)
            
            .done(function(resposta){
                //debugger;
                dadosModel2.setData(resposta);
                this.buscarPartidas(resposta.rodada_atual.rodada);

            }.bind(this))
            
            .fail(function(erro){
                //debugger;
            });
        },

        buscarClassificacao: function(){


            //obter o model a ser atualizado
            var classificacaoModel2 = this.getView().getModel("ModeloClassificacao");

            const configuracoes = {
                url : "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                method : "GET",
                async :  true,
                crossDomain : true,
                headers : {
                    "Authorization": "Bearer live_fcd430ae362f04f041adba062b3e45"
                }
            };

            //fazemos a chamada a API
            $.ajax(configuracoes)
            
            .done(function(resposta){
                //debugger;
                classificacaoModel2.setData({"Classificacao" : resposta});

            })
            
            .fail(function(erro){
                //debugger;
            });
        },

        buscarPartidas: function(rodada){


            //obter o model a ser atualizado
            var partidasModel2 = this.getView().getModel("ModeloPartidas");

            const configuracoes = {
                url : "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodada,
                method : "GET",
                async :  true,
                crossDomain : true,
                headers : {
                    "Authorization": "Bearer live_fcd430ae362f04f041adba062b3e45"
                }
            };

            //fazemos a chamada a API
            $.ajax(configuracoes)
            
            .done(function(resposta){
                //debugger;
                partidasModel2.setData(resposta);

            })
            
            .fail(function(erro){
                //debugger;
            });
        }
    });
});
