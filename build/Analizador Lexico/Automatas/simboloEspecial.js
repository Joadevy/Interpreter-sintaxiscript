export function esSimboloEspecial(codigoFuente, control, lexema) {
    let simbolosEspeciales = { ',': 'tComa',
        ';': 'tPuntoComa',
        '(': 'tParentesisAbre',
        ')': 'tParentesisCierra',
        '{': 'tLlaveAbre',
        '}': 'tLlaveCierra',
        '>': 'tOpRel',
        '<': 'tOpRel',
        '>=': 'tOpRel',
        '<=': 'tOpRel',
        '==': 'tOpRel',
        '<>': 'tpRel',
        "=": 'tOpAsignacion' };
    let compLex = '';
    lexema += codigoFuente[control];
    if (simbolosEspeciales.hasOwnProperty(codigoFuente[control])) {
        switch (codigoFuente[control]) {
            case ',':
                compLex = simbolosEspeciales[','];
                break;
            case ';':
                compLex = simbolosEspeciales[';'];
                break;
            case '(':
                compLex = simbolosEspeciales['('];
                break;
            case ')':
                compLex = simbolosEspeciales[')'];
                break;
            case '{':
                compLex = simbolosEspeciales['{'];
                break;
            case '}':
                compLex = simbolosEspeciales['}'];
                break;
            case '>':
                {
                    compLex = simbolosEspeciales['>'];
                    if (codigoFuente[control + 1] == '=') {
                        compLex = simbolosEspeciales['>='];
                        lexema += codigoFuente[control + 1];
                        control++;
                    }
                }
                break;
            case '<':
                compLex = simbolosEspeciales['<'];
                if (codigoFuente[control + 1] == '=') {
                    compLex = simbolosEspeciales['<='];
                    lexema += codigoFuente[control + 1];
                    control++;
                }
                else if (codigoFuente[control + 1] == '>') {
                    compLex = simbolosEspeciales['<>'];
                    lexema += codigoFuente[control + 1];
                    control++;
                }
                break;
            case '=':
                compLex = simbolosEspeciales['='];
                if (codigoFuente[control + 1] == '=') {
                    compLex = simbolosEspeciales['=='];
                    lexema += codigoFuente[control + 1];
                    control++;
                }
                break;
        }
        return [true, control + 1, lexema, compLex];
    }
    else {
        return [false, control];
    }
}
