export let tablaSimbolos: object = {
    // Tiene la forma de lexema: componente lexico, se ira actualizando a medida que se encuentren identificadores.
    'program':'tProgram',
    'while':'tWhile',
    'if':'tIf',
    'else':'tElse',
    ',':'tComa',
    ';':'tPuntoComa',
    '[':'tCorcheteAbre',
    ']':'tCorcheteCierra',
    '{':'tLlaveAbre',
    '}':'tLlaveCierra',
    '>' : 'opRel',
    '<' : 'opRel',
    '>=' : 'opRel',
    '<=' : 'opRel',
    '==' : 'opRel',
    '!=' : 'opRel',
    "=" : 'opAsignacion',
    "AND" :'tAnd',
    "OR" : 'tOr',
    "NOT" :'tNot'
  };