"use strict";
// HTML
// setField('test', true)
const state = {
    test: true
};
// Funciona
// state.test = true // Porque o tipo State tem o campo test e é do tipo boolean
// Não funciona
// state.test = ''; // Porque o test é do tipo boolean
// state.teste = true; // Porque o teste não existe no tipo State
// A função abaixo receberá uma variável do tipo State, e um valor do tipo boolean
function setState(state, value) {
    // Com base no estado enviado, será buscado o campo test
    // E o valor enviado será o enviado por value
    state['test'] = value;
}
// A função abaixo receberá uma variável do tipo State, e um valor do tipo boolean
setState(state, true);
