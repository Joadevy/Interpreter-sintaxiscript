
**Projecto final sintaxis & semantica de los lenguajes**

Deploy Alpha version: https://joadevy.github.io/sintaxis-final-project/

» Es una UI que toma un archivo.txt donde este debe contener el codigo fuente del programa. Se cuentan con dos opciones donde:
- Ejecutar analizador lexico: realizara el analisis lexico del programa introducido y devolvera en pantalla los componentes lexicos (cada uno de los componentes atomicos del programa que tienen el mismo significado a nivel semantico: identificador, constante real, operador relacional, etc) que ha encontrado.
- Ejecutar analizador sintactico: realizara el analisis sintactico, donde trabajando en conjunto con el analizador lexico, detectara posibles errores a nivel sintactico, es decir, en la forma que se ha escrito el codigo del programa, verificando si este cumple las reglas definidas por el lenguaje (por ejemplo que haya ; luego de cada sentencia pero NO en la ultima de estas). En caso de detectar un error mostrara un log con informacion del mismo. En caso de exito, se mostrara el arbol sintactico.

## Documentacion del lenguaje
Sintaxiscript es un lenguaje donde un programa es una secuencia de sentencias. Cada sentencia puede ser una declaracion de variables, una asignacion, una escritura, una lectura, un condicional (if / if else) o un ciclo while.

Otras caracteristicas importantes son:
- Todas las variables en un programa son del tipo constante real y no es necesario indicarlo.
- Una expresion aritmetica puede incluir los operadores aritmeticos: + para indicar suma, - para indicar resta, * para indicar producto, / para indicar division, ^ para indicar potenciacion, RAIZ para indicar una raiz.

#### Escribiendo un programa en Sintaxiscript
» Para iniciar la declaracion de un programa se utiliza la palabra reservada Program junto a un identificador del programa. El cuerpo del programa se encerrara mediante llaves {CUERPO}.

```javascript
Program demo { 
  // Cuerpo del programa
}
```

#### Declaracion de una sentencia
» Para declarar sentencias en Sintaxisript se debe tener en cuenta la utilizacion de ; para separar cada una de las sentencias, a excepcion de la ultima sentencia del cuerpo del programa. 

```javascript
variable1 = 100,54;
variable2 = 110;
suma = variable1 + variable2;
control = 0;
if [suma>=200]{
  control = 1;
};
suma = 0
```

#### Declaracion de variables
» Toda variable debe ser declarada ANTES de ser utilizada. Dichas declaraciones se haran mediante la palabra reservada var y luego la lista de variables que se quieran declarar separadas mediante coma.

```javascript
var variable1,variable2,variable3;
```

#### Asignacion de variables
» Toda asignacion se hara hacia una expresion aritmetica sobre numeros reales. Bajo este concepto seran admitidas asignaciones a otras variables (ya que contienen numeros reales) o cualquier operacion aritmetica valida antes mencionada. Se admite el uso de parentesis ( ) para modificar las prioridades de las operaciones. La asociatividad de las mismas se ha definido por izquierda.

```javascript
var variable1,variable2,suma,resta,producto, cociente, potencia, raiz, opCombinada;
variable1 = 25;
variable2 = 5;
suma = variable1 + variable2;
resta = variable1 - variable2;
producto = variable1 * variable2;
cociente = variable1 / variable2;
potencia = variable1 ^ variable2;
raiz = RAIZ variable1;
opCombinada = variable1 * (variable2 + variable1)
```

#### Sentencias condicionales
» Para declarar una sentencia condicional se utilizan las palabras reservadas if y else. La condicion se representara entre corchetes [CONDICION]. Es posible utilizar operadores logicos (and, or, not)

```javascript
var control,cambio;
control = 1;
cambio = 10,20;
if [control == 1]{
  control = cambio - 10;
} else {
  control = cambio + 10;
}
```

#### Declaracion de un ciclo while
» El ciclo while funcionara de manera similar, sintacticamente, a la estructura condicional. La condicion quedara tambien encerrada entre corchetes [CONDICION]. Es posible utilizar operadores logicos (and, or, not)

```javascript
var control,cambio;
cambio = 0;
control = 0;
while [cambio < 100]{
  cambio = cambio + 10;
};
control = 1
```

## Author

- Twitter - [@JoaquinArlettaz](https://twitter.com/JoaquinArlettaz)
- Gmail - [jjoaquinArlettaz@gmail.com](mailto:jjoaquinarlettaz@gmail.com)
- LinkedIn - [@joaquin-arlettaz](https://www.linkedin.com/in/joaqu%C3%ADn-arlettaz/)
