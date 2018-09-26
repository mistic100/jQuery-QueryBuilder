/*!
 * jQuery QueryBuilder 2.5.2
 * Locale: Portuguese (pt-PT)
 * Author: Miguel Guerreiro, migas.csi@gmail.com
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 */

(function(root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(['jquery', 'query-builder'], factory);
    }
    else {
        factory(root.jQuery);
    }
}(this, function($) {
"use strict";

var QueryBuilder = $.fn.queryBuilder;

QueryBuilder.regional['pt-PT'] = {
  "__locale": "Portuguese (pt-PT)",
  "__author": "Miguel Guerreiro, migas.csi@gmail.com",
  "add_rule": "Nova Regra",
  "add_group": "Novo Grupo",
  "delete_rule": "Excluir",
  "delete_group": "Excluir",
  "conditions": {
    "AND": "E",
    "OR": "OU"
  },
  "operators": {
    "equal": "Igual a",
    "not_equal": "Diferente de",
    "in": "Contido",
    "not_in": "Não contido",
    "less": "Menor que",
    "less_or_equal": "Menor ou igual a",
    "greater": "Maior que",
    "greater_or_equal": "Maior ou igual que",
    "between": "Entre",
    "begins_with": "Começar por",
    "not_begins_with": "Não a começar por",
    "contains": "Contém",
    "not_contains": "Não contém",
    "ends_with": "Terminando com",
    "not_ends_with": "Terminando sem",
    "is_empty": "É vazio",
    "is_not_empty": "Não é vazio",
    "is_null": "É nulo",
    "is_not_null": "Não é nulo"
  },
  "errors": {
    "no_filter": "Nenhum filtro selecionado",
    "empty_group": "O grupo está vazio",
    "radio_empty": "Nenhum valor selecionado",
    "checkbox_empty": "Nenhum valor selecionado",
    "select_empty": "Nenhum valor selecionado",
    "string_empty": "Valor vazio",
    "string_exceed_min_length": "É necessário conter pelo menos {0} caracteres",
    "string_exceed_max_length": "É necessário conter mais de {0} caracteres",
    "string_invalid_format": "Formato inválido ({0})",
    "number_nan": "Não é um número",
    "number_not_integer": "Não é um número inteiro",
    "number_not_double": "Não é um número real",
    "number_exceed_min": "É necessário ser maior que {0}",
    "number_exceed_max": "É necessário ser menor que {0}",
    "number_wrong_step": "É necessário ser múltiplo de {0}",
    "datetime_invalid": "Formato de data inválido ({0})",
    "datetime_exceed_min": "É necessário ser superior a {0}",
    "datetime_exceed_max": "É necessário ser inferior a {0}"
  }
};

QueryBuilder.defaults({ lang_code: 'pt-PT' });
}));