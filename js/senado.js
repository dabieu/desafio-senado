$.getJSON('https://legis.senado.leg.br/dadosabertos/senador/lista/atual.json', function(data) {
    num_parlamentares = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar.length;

    $('#titulo-galeria').append('<h3 class="titulo text-muted mb-3">'+num_parlamentares+' Encontrados</h3>');

    //For para percorrer o array de parlamentares
    for(let i = 0; i<num_parlamentares; i++) {

        //Resgatando informações dos parlamentares
        var nome_parlamentar = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.NomeParlamentar;
        var url_foto = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.UrlFotoParlamentar;
        var uf_parlamentar = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.UfParlamentar;
        var bandeira = '';
        var sigla_partido = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.SiglaPartidoParlamentar;
        var inicio_mandato = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].Mandato.PrimeiraLegislaturaDoMandato.DataInicio.slice(0, 4);
        var fim_mandato = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].Mandato.SegundaLegislaturaDoMandato.DataFim.slice(0, 4);
        var partido = '';
        var nome_completo = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.NomeCompletoParlamentar;
        var membro_mesa = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.MembroMesa;
        var membro_lideranca = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.MembroLideranca;
        var link_pagina = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.UrlPaginaParlamentar;
        var cargo = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.FormaTratamento;
        var cod_parlamentar = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.CodigoParlamentar;
        


        //Texto que vem junto com o partido
        switch(sigla_partido) {
            case 'PDT':
                partido = 'Bloco Parlamentar Senado Independente - ';
                break;
            case 'CIDADANIA':
                partido = 'Bloco Parlamentar Senado Independente - ';
                break;
            case 'PSD':
                partido = 'Partido Social Democrático - ';
                break;
            case 'DEM':
                partido = 'Bloco Parlamentar Vanguarda - ';
                break;
            case 'MDB':
                partido = 'Bloco Parlamentar Unidos pelo Brasil - ';
                break;
            case 'PP':
                partido = 'Bloco Parlamentar Unidos pelo Brasil - ';
                break;
            case 'REDE':
                partido = 'Bloco Parlamentar Senado Independente - ';
                break;
            case 'PROS':
                partido = 'Bloco Parlamentar da Resistência Democrática - ';
                break;
            case 'PT':
                partido = 'Bloco Parlamentar da Resistência Democrática - ';
                break;
            case 'REPUBLICANOS':
                partido = 'Bloco Parlamentar Unidos pelo Brasil - ';
                break;
            case 'PSDB':
                partido = 'Bloco Parlamentar PSDB/PSL - ';
                break;
            case 'PL':
                partido = 'Bloco Parlamentar Vanguarda - ';
                break;
            case 'PSB':
                partido = 'Bloco Parlamentar Senado Independente - ';
                break;
            case 'PSL':
                partido = 'Bloco Parlamentar PSDB/PSL - ';
                break;
            case 'PSC':
                partido = 'Bloco Parlamentar Vanguarda - ';
                break;
        }

        //Adiciona um card do parlamentar na tela
        $('#galeria').append(`<div class="col-lg-3 col-md-6 col-sm-6 col-12" id="card-`+i+`">
                            <div class="card mb-4 shadow cartao-senador">
                                <img class="card-img-top" src="`+url_foto+`" alt="Foto do parlamentar">
                                <div class="card-body">
                                    <h5 class="titulo-card">`+nome_parlamentar+`</h5>
                                    <h6 class="text-muted titulo-card">`+uf_parlamentar+` - <img src="img/bandeiras/`+uf_parlamentar+`.gif"></h6>       
                                    <h6 class="titulo-card text-muted mb-3">`+sigla_partido+`</h6>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <button type="button" data-toggle="modal" data-target="#detalhes-senador-`+i+`" class="btn btn-md btn-outline-success">Detalhes</button>
                                    </div>
                                </div>
                            </div>
                           </div>`);
        //Adiciona informação à modal do senador
        $('#modal-senador').append(`<div class="modal fade" id="detalhes-senador-`+i+`" tabindex="" role="dialog" aria-labelledby="detalhes-senadorLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <div class="row" style="margin-bottom:5px;">
                                            <div class="col-lg-6">
                                                <h5 class="modal-title" id="detalhes-senadorlLabel">`+nome_parlamentar+` - `+uf_parlamentar+` <img src="img/bandeiras/`+uf_parlamentar+`.gif"></h5>
                                            </div>
                                            <div class="col-lg-6">
                                                <h5 id="periodo" class="modal-title" style="text-align:right; margin-left:auto;">Período: `+inicio_mandato+` - `+fim_mandato+`</h5>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <h6 class="modal-title text-muted" id="partido-sigla">`+partido + sigla_partido+`</h6>
                                        </div>
                                    </div>
                                    <div class="modal-body jumbotron">
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <img src="`+url_foto+`" style="border-radius: 10px;">
                                            </div>
                                            <div class="col-lg-8 text-justify" id="dados-pessoais-`+i+`">
                                                <h3>Dados pessoais</h3>
                                                <span><b>Nome civil: </b>`+nome_completo+`<span> <br>
                                                <span><b>Cargo: </b>`+cargo+`<span> <br>
                                                <span><b>Membro da mesa: </b>`+membro_mesa+`<span> <br>
                                                <span><b>Membro da liderança: </b>`+membro_lideranca+`<span> <br>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                    <a href="`+link_pagina+`" target="_blank" id="link-parlamentar" class="btn btn-success">Página oficial</a>
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Fechar</button>
                                    </div>
                                </div>
                            </div>
                        </div>`);

        //Esconde os cards depois dos 8 primeiros
        if(i >= 8) {
            $('#card-'+i).hide();
        }

        //Requisição do JSON com as comissões do parlamentar
        $.getJSON('https://legis.senado.leg.br/dadosabertos/senador/'+cod_parlamentar+'/comissoes.json', function(data2) {
            var cod_comissao_parlamentar = data2.MembroComissaoParlamentar.Parlamentar.IdentificacaoParlamentar.CodigoParlamentar;
            var total_comissoes = data2.MembroComissaoParlamentar.Parlamentar.MembroComissoes.Comissao.length
                if(cod_comissao_parlamentar == data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.CodigoParlamentar) {
                    var num_titular = 0;
                    var num_suplente = 0;
                    for(let j = 0; j < total_comissoes; j++) {
                        if(data2.MembroComissaoParlamentar.Parlamentar.MembroComissoes.Comissao[j].DescricaoParticipacao == 'Titular') {
                            num_titular++;
                        } else if (data2.MembroComissaoParlamentar.Parlamentar.MembroComissoes.Comissao[j].DescricaoParticipacao == 'Suplente') {
                            num_suplente++;
                        }
                    }
                    
                    $('#dados-pessoais-'+i).append('<span><b>Comissões como titular: </b>'+num_titular+'<span> <br>');
                    $('#dados-pessoais-'+i).append('<span><b>Comissões como suplente: </b>'+num_suplente+'<span> <br>');
                    
                }
        });

        
    }
 
    //Calcula quantas páginas deverão ser criadas (8 cards em cada página)
    if (num_parlamentares % 8 == 0) {
        var num_paginas = num_parlamentares / 8;
    } else {
        var num_paginas = Math.trunc(num_parlamentares / 8) + 1;
    }

    //Função que controla a paginação de cards
    function paginacao(botao){
        id_botao = parseInt(parseInt(botao.target.attributes[1].value.slice(6, )));

        //Define o primeiro e o ultimo card de cada página
        if(id_botao == 1) {
            var firstCard = 0;
            var lastCard = 7;
        } else {
            var firstCard = 8 * (id_botao - 1);
            var lastCard = 8 * id_botao - 1;
        }
        
        //Esconde e exibe os cards da página selecionada
        for(var i = 0; i<num_parlamentares; i++) {
            $('#card-'+i).hide();
            if(i>=firstCard && i<=lastCard) {
                $('#card-'+i).show().addClass('animate__animated animate__fadeIn');
            }
        }

        //estiliza o botão de navegação clicado
        for(var i = 1; i <= num_paginas; i++) {
            $('#botao-' + i).removeClass('clicado');
        }
        $('#botao-' + id_botao).addClass('clicado');
    }

    //Cria e exibe a barra de paginação
    for(var i = 1; i <= num_paginas; i++) {
        $('#barra-paginacao').append('<li class="page-item"><button class="page-link" id="botao-'+i+'">'+i+'</button></li>');
        document.getElementById('botao-' + i).addEventListener('click', paginacao);
    }
    $('#botao-1').addClass('clicado');

    //Função responsável pela filtragem por estado e partido
    function filtrar() {

        $('#paginacao').hide();
        var filtro_estado = $("#select-estados option:selected").val();
        var filtro_partido = $("#select-partidos option:selected").val();

        if(filtro_estado != 0 && filtro_partido == 0) {
            
            for(let i = 0; i <num_parlamentares; i++) {
                $('#card-'+i).hide();
                if(filtro_estado == data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.UfParlamentar) {
                    $('#card-'+i).show().addClass('animate__animated animate__fadeIn');
                }
            }
        } else if(filtro_estado != 0 && filtro_partido != 0) {
            for(let i = 0; i <num_parlamentares; i++) {
                $('#card-'+i).hide();
                if(filtro_estado == data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.UfParlamentar && filtro_partido == data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.SiglaPartidoParlamentar) {
                    $('#card-'+i).show().addClass('animate__animated animate__fadeIn');
                }
            }
        } else if(filtro_estado == 0 && filtro_partido != 0) {
            for(let i = 0; i <num_parlamentares; i++) {
                $('#card-'+i).hide();
                if(filtro_partido == data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.SiglaPartidoParlamentar) {
                    $('#card-'+i).show().addClass('animate__animated animate__fadeIn');
                }
            }
        } else {
            for(let i = 0; i <num_parlamentares; i++) {
                $('#card-'+i).show();
                if(i >= 8) {
                    $('#card-'+i).hide();
                }
            }
            $('#paginacao').show();
        }

    }

    document.getElementById('aplicar-filtro').addEventListener('click', filtrar);

});
