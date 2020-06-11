$.getJSON('http://legis.senado.leg.br/dadosabertos/senador/lista/atual.json', function(data) {
    console.log(data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar);
    num_parlamentares = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar.length;

    $('#titulo-galeria').append('<h3 class="titulo text-muted mb-5">'+num_parlamentares+' Encontrados</h3>');

    //For para percorrer o array de parlamentares
    for(var i = 0; i<num_parlamentares; i++) {

        //Resgata valores essenciais dos parlamentares
        var nome_parlamentar = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.NomeParlamentar;
        var url_foto = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.UrlFotoParlamentar;
        var uf_parlamentar = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.UfParlamentar;
        var bandeira = '';
        var sigla_partido = data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar[i].IdentificacaoParlamentar.SiglaPartidoParlamentar;

        //Adiciona um card do parlamentar na tela
        $('#galeria').append(`<div class="col-md-3">
                            <div class="card mb-4 shadow cartao-senador" id="card-`+i+`">
                                <img class="card-img-top" src="`+url_foto+`" alt="Foto do parlamentar">
                                <div class="card-body">
                                    <h5 class="titulo-card">`+nome_parlamentar+`</h5>
                                    <h6 class="text-muted titulo-card">`+uf_parlamentar+` - <img src="img/bandeiras/`+uf_parlamentar+`.gif"></h6>
                                    <h6 class="titulo-card text-muted mb-3">`+sigla_partido+`</h6>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <button type="button" class="btn btn-md btn-outline-success">Detalhes</button>
                                    </div>
                                </div>
                            </div>
                           </div>`);

        //Esconde os cards depois dos 8 primeiros
        if(i >= 8) {
            $('#card-'+i).hide();
        }
    }
 
    //Calcula quantas páginas deverão ser criadas (8 cards em cada página)
    if (num_parlamentares % 8 == 0) {
        var num_paginas = num_parlamentares / 8;
    } else {
        var num_paginas = Math.trunc(num_parlamentares / 8) + 1;
    }

    function paginacao(botao){
        id_botao = parseInt(botao.path[0].id.slice(6, ));

        if(id_botao == 1) {
            var firstCard = 0;
            var lastCard = 7;
        } else {
            var firstCard = 8 * (id_botao - 1);
            var lastCard = 8 * id_botao - 1;
        }
        

        for(var i = 0; i<num_parlamentares; i++) {
            $('#card-'+i).hide();
            if(i>=firstCard && i<=lastCard) {
                $('#card-'+i).show().addClass('animate__animated animate__fadeIn animate__slow');
            }
        }

        //estiliza o botão clicado
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
    /*$('#barra-paginacao').append(`<li class="page-item">
                                      <a class="page-link" href="#">Próximo</a>
                                  </li>`);  */

});
