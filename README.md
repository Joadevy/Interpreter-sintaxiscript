
# Proyecto final sintaxis & semantica de los lenguajes

## Live Site 🚀
» Live site - (version en desarrollo): https://joadevy.github.io/sintaxis-final-project/

## Tabla de contenidos
  - [Vista general](#vista-general)
  - [Documentacion](#documentacion-del-lenguaje)
  - [Herramientas utilizadas](#herramientas-y-metodologia-de-desarrollo)
  - [Autor](#autor)
  - [Feedback](#feedback)

## Vista general
» El proyecto trata de construir un interprete para un lenguaje con caracteristicas especificas. Dicho interprete consta de un analizador lexico,primera eapa del proceso de compilacion, donde se evaluan las estructuras a nivel atomico y se reconocen cada uno de los componentes lexicos, un analizador sintactico en el cual se analiza la estructura del programa determinando que secuencia de componentes lexicos es valida y cuales no, y un analizador semantico que evalua el significado del programa para verificar que es lo que hace cada sentencia y si estas tienen sentido.  
  
  » La implementacion que he abordado para este concepto se trata de una aplicacion que toma un archivo de texto (formato .txt) donde este debe contener el codigo fuente del programa.  
Una vez cargado un archivo valido se cuenta con dos opciones donde:

- Ejecutar analizador lexico: devolvera en pantalla los componentes lexicos que ha encontrado, esto es cada uno de los componentes atomicos del programa que tienen el mismo significado a nivel sintactico: identificador, constante real, operador relacional, etc.
- Ejecutar analizador sintactico: trabajando en conjunto con el analizador lexico, detectara posibles errores a nivel sintactico, es decir, en la forma que se ha escrito el codigo del programa, verificando si este cumple las reglas definidas por el lenguaje (por ejemplo que haya ; luego de cada sentencia) En caso de detectar un error mostrara un log con informacion del mismo. En caso de exito, se mostrara el arbol sintactico que representa la estructura sintactica que tiene el estado del programa y el orden en que se ejecutan las operaciones simples.

## Documentacion del lenguaje
Sintaxiscript es un lenguaje donde un programa es una secuencia de sentencias. Cada sentencia puede ser una declaracion de variables, una asignacion, una escritura, una lectura, un condicional (if / if else) o un ciclo while.

Otras caracteristicas importantes son:
- Todas las variables en un programa son del tipo constante real y no es necesario indicarlo.
- Todas las constantes son positivas por defecto. Para indicar un numero negativo se debe plantear el opuesto mediante: -(5), o en general -(constReal).
- Una expresion aritmetica puede incluir los operadores aritmeticos: + para indicar suma, - para indicar resta, * para indicar producto, / para indicar division, ^ para indicar potenciacion, RAIZ para indicar una raiz.

#### Escribiendo un programa en Sintaxiscript
» Para iniciar la declaracion de un programa se utiliza la palabra reservada Program junto a un identificador del programa. El cuerpo del programa se encerrara mediante llaves {CUERPO}.

```javascript
Program demo { 
  // Cuerpo del programa
}
```

#### Declaracion de una sentencia
» Para declarar sentencias en Sintaxiscript se debe tener en cuenta la utilizacion de ; como separador de sentencias, es decir, siempre que esta sentencia no represente la ultima antes de un cierre mediante llave } 

```javascript
variable1 = 100.54;	// Se utiliza . para denotar decimales en una constante real
variable2 = 110;
suma = variable1 + variable2;
control = -(10);  	// Para numeros negativos se indican anteponiendo un - y la constante entre parentesis. 
if [suma>=200]{
  control = 1
};
suma = 0
```

#### Declaracion de variables
» Toda variable debe ser declarada ANTES de ser utilizada. Dichas declaraciones se haran mediante la palabra reservada var y luego la lista de variables que se quieran declarar separadas mediante coma.

```javascript
var variable1,variable2,variable3;
```

#### Asignacion de variables
» Toda asignacion se hara hacia una expresion aritmetica sobre numeros reales. Bajo este concepto seran admitidas asignaciones a otras variables (ya que contienen numeros reales) o cualquier operacion aritmetica valida antes mencionada. Se admite el uso de parentesis ( ) para modificar las prioridades de las operaciones. La asociatividad de las mismas ha sido definida por izquierda.

```javascript
var variable1,variable2,suma,resta,producto, cociente, potencia, radical, opCombinada;
variable1 = 25;
variable2 = 5;
suma = variable1 + variable2;
resta = variable1 - variable2;
producto = variable1 * variable2;
cociente = variable1 / variable2;
potencia = variable1 ^ variable2;
radical = RAIZ (variable1);			// El radicando debe ir entre parentesis: RAIZ (radicando)
opCombinada = variable1 * (variable2 + variable1)
```

#### Sentencias condicionales
» Para declarar una sentencia condicional se utilizan las palabras reservadas if y else. La condicion se representara entre corchetes [CONDICION]. Es posible utilizar operadores logicos (and, or, not)

```javascript
var control,cambio;
control = 1;
cambio = 10.20;
if [control == 1 or cambio>10]{
  control = cambio - 10
} else {
  control = cambio + 10
}
```

#### Declaracion de un ciclo while
» El ciclo while funcionara de manera similar, sintacticamente, a la estructura condicional. La condicion quedara tambien encerrada entre corchetes [CONDICION]. Es posible utilizar operadores logicos (and, or, not)

```javascript
var control,cambio;
cambio = 0;
control = 0;
while [cambio < 100 and not[control == 1]]{
  cambio = cambio + 10
};
control = 1
```

#### Escritura en pantalla
» Para realizar impresiones en pantalla se utiliza la palabra reservada Print que recibe como argumentos,separados por comas, a cadenas, que se escriben encerrandolas con "ejemplo cadena", y expresiones aritmeticas, identificadores o constantes reales. 

```javascript
var dinero,control;
dinero = 0;
control = 0;
if [dinero == 0 or not[control <> 0]]{
  dinero = dinero + 100.50;
  Print("El dinero actual es: ",dinero);
  control = 1
};
Print("El doble del dinero actual es: ",dinero*2,"fin de programa")
```
#### Lectura de una variable
» Para leer una variable se utiliza la palabra reservada Read que recibe como argumentos ("cadena",id). Donde cadena es una cadena que se muestra en pantalla e id es la variable a leer.

```javascript
var dinero,boleto;
Read("dinero disponible",dinero);
if [dinero <= 50]{
		Print("Para 50 aun faltan: ",50-dinero)
}else{
		Read("tipo de boleto",boleto);
		Print(boleto,"ha sido adquirido")
}
```

## Herramientas y metodologia de desarrollo
 
- TypeScript
- Sass
- Control de versiones del proyecto usando Git
- Mobile first workflow
- Responsive design

## Autor

- Twitter - [@JoaquinArlettaz](https://twitter.com/JoaquinArlettaz)
- LinkedIn - [@joaquin-arlettaz](https://www.linkedin.com/in/joaqu%C3%ADn-arlettaz/)

## Feedback
Cualquier comentario y/o sugerencia/apreciacion acerca del proyecto, asi como tambien cualquier duda respecto del mismo puede ser consultada a cualquiera de mis redes/formas de contacto y estare contento de responderlas.

** Gracias por leer, que tengas un buen dia! ** 🚀
