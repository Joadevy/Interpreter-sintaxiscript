export function esSimboloEspecial(codigoFuente:string,control:number,lexema:string):Array<any>{
    let simbolosEspeciales = 
    {',':'tComa',
    ';':'tPuntoComa',
    '(':'tParentesisAbre',
    ')':'tParentesisCierra',
    '+' : 'tSuma',
    '-' : 'tResta',
    '/' : 'tDivision',
    '*' : 'tProducto',
    '{':'tLlaveAbre',
    '}':'tLlaveCierra',
    '>' : 'tOpRel',
    '<' : 'tOpRel',
    '>=' : 'tOpRel',
    '<=' : 'tOpRel',
    '==' : 'tOpRel',
    '<>' : 'tOpRel',
    "=" : 'tOpAsignacion'}

    let compLex = ''
    lexema += codigoFuente[control];
    if(simbolosEspeciales.hasOwnProperty(codigoFuente[control])){
       switch (codigoFuente[control]){
            case ',':
                compLex = simbolosEspeciales[',']
            break
            case ';':
                compLex = simbolosEspeciales[';']
            break
            case '(':
                compLex = simbolosEspeciales['(']
            break
            case ')':
                compLex = simbolosEspeciales[')']
            break
            case '{':
                compLex = simbolosEspeciales['{']
            break
            case '}':
                compLex = simbolosEspeciales['}']
            break
            case '+':
                compLex = simbolosEspeciales['+']
            break
            case '-':
                compLex = simbolosEspeciales['-']
            break
            case '*':
                compLex = simbolosEspeciales['*']
            break
            case '/':
                compLex = simbolosEspeciales['/']
            break    
            case '>': {
                compLex = simbolosEspeciales['>']
                if (codigoFuente[control+1] == '='){
                    compLex = simbolosEspeciales['>=']
                    lexema += codigoFuente[control+1]
                    control++
                }
            }
            break
            case '<':
                compLex = simbolosEspeciales['<']
                if (codigoFuente[control+1] == '='){
                    compLex = simbolosEspeciales['<=']
                    lexema += codigoFuente[control+1]
                    control++
                } else if (codigoFuente[control+1] == '>'){
                    compLex = simbolosEspeciales['<>']
                    lexema += codigoFuente[control+1]
                    control++
                }
            break
            case '=':
                compLex = simbolosEspeciales['=']
                if (codigoFuente[control+1] == '='){
                    compLex = simbolosEspeciales['==']
                    lexema += codigoFuente[control+1]
                    control++
                }
            break       
        }

       return [true,control+1,lexema,compLex]
    } else {
        return [false,control]
    }
}