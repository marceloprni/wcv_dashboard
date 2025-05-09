
import { options1, drawRing, graphLine } from "./graphInformation.js";

var canvas1 = document.getElementById("value-1")
var canvas2 = document.getElementById("value-2")
var canvas3 = document.getElementById("value-3")
var canvas4 = document.getElementById("value-4")
var canvas5 = document.getElementById("value-5")
var canvas6 = document.getElementById("value-6")
var canvas7 = document.getElementById("value-7")
var canvas8 = document.getElementById("value-8")

var ctx1 = document.getElementById("grafico-1");
var ctx2 = document.getElementById("grafico-2");
var ctx3 = document.getElementById("grafico-3");
var ctx4 = document.getElementById("grafico-4");

var indicadores = ["Disponibilidade", "Performance", "Qualidade"];
var colouarray = ['red', 'green', 'blue'];
var color1 = ['#003f5c', '#58508d' ,'#bc5090', '#ff6361', '#ffa600'];


drawRing(canvas1, "#4BB543", 12);
drawRing(canvas2, "#4BB543", 12);
drawRing(canvas3, "#4BB543", 12);
drawRing(canvas4, "#4BB543", 12);
drawRing(canvas5, "#4BB543", 12);
drawRing(canvas6, "#4BB543", 12);
drawRing(canvas7, "#4BB543", 12);
drawRing(canvas8, "#4BB543", 12);

graphLine(ctx1)
graphLine(ctx2)
graphLine(ctx3)
graphLine(ctx4)

