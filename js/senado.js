$.getJSON('http://legis.senado.leg.br/dadosabertos/senador/lista/atual.json', function(data) {
    console.log(data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar);
    
});
