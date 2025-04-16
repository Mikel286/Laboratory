const plot = document.getElementById("layout_box");

const Longitud = comunas.map((item) => item.longitud);
const Latitud = comunas.map((item) => item.latitud);
const residuos = comunas.map((item) => item.cantidad_toneladas)

const min = Math.min(...residuos);
const max = Math.max(...residuos);

const residuosEscalados = residuos.map((r) => {
  return 5 + ((r - min) / (max - min)) * (30 - 5);
});

const data = [
    {
      //Trampa para visualizar solo Chile :)
      type: "choropleth",
      locations: ["CHL"],
      z: [0], // Valor de color para Chile utilizando la escala de colores definida a continuación. El valor puede ser 0 o 1, ya que la escala de colores solo contiene un color.
      colorscale: [
        [0, "#ddd"],
        [1, "#008727"],
      ], // Parece que se requiere una escala de colores, pero solo necesitamos un color.
      showscale: false,
      hoverinfo: "skip",
    },
    
  ];
  

const layout = {

title: {
  text: '<b>Consumo de alcohol en el mundo - 2020</b>',
  font: {
    family: 'Lato',
    size: 24,
    color: 'rgb(220, 0, 0)'
  },
  x: 0.5,
  y: 0.8,
  xanchor: 'center'
},
geo: {
    scope: "south america",
    showland: false,
    countrywidth: 0,
    lonaxis: { range: [-64, -76] },
    lataxis: { range: [-18, -59] },
},
    width: 200,
    height: 800,
    margin: { l: 0, r: 0, b: 0, t: 0, pad: 0 },
    dragmode: false,
};

Plotly.newPlot(plot, data, layout, {
    scrollZoom: false,
    displayModeBar: false,
});