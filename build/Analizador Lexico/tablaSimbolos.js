"use strict";
let tablaSimbolos = {
    // Tiene la forma de lexema: componente lexico, se ira actualizando a medida que se encuentren identificadores.
    'program': 'PROGRAM',
    'while': 'WHILE',
    'for': 'FOR',
    'if': 'IF',
    'then': 'THEN',
    'else': 'ELSE',
    'do': 'DO',
    ',': ',',
    '[': '[',
    ']': ']',
    '{': '{',
    '}': '}',
    ':': ':',
    '>': 'opRel',
    '<': 'opRel',
    '>=': 'opRel',
    '<=': 'opRel',
    '==': 'opRel',
    '!=': 'opRel',
    "=": 'opAsignacion',
};
