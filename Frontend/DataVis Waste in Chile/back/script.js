fetch("regiones.json")
  .then(res => res.json())
  .then(geojson => {
    const regiones = desperdicios.map(r => r.region);
    const toneladas = desperdicios.map(r => r.toneladas);

    const data = [{
  type: "choropleth",
  geojson: geojson,
  locations: regiones,
  z: toneladas,
  featureidkey: "properties.Region",

  colorscale: [
  [0, "#f5c08f"],
  [0.167, "#f5c08f"],

  [0.167, "#ef9e52"],
  [0.334, "#ef9e52"],

  [0.334, "#e07715"],
  [0.5, "#e07715"],

  [0.5, "#b66111"],
  [0.668, "#b66111"],

  [0.668, "#83450c"],
  [0.835, "#83450c"],
  
  [0.835, "#4b2807"],
  [1, "#4b2807"]
],
  zmin: 0,
  zmax: 3000000,
  marker: {
    line: {
      color: "black",
      width: 0.5
    }
  },
  hoverinfo: "skip",
  showscale: false
},

];

    const layout = {
      
      width: 650,
      height: 600,
      margin: { l: 0, r: 0, b: 0, t: 0, pad: 0 },
      dragmode: false,
      
      geo: {
        scope: "south america",
        showland: false,
        countrywidth: 0,
        lonaxis: { range: [-64, -76] },
        lataxis: { range: [-18, -59] },
      },
      
      shapes: [
    {
      type: "line",           // Definir la forma como una línea
      x0: -62.6373209,        // Longitud del inicio de la línea
      y0: -38.710133,         // Latitud del inicio de la línea
      x1: -50,                // Longitud del final de la línea
      y1: -38.710133,         // Latitud del final de la línea
      line: {
        color: "blue",        // Color de la línea
        width:2              // Grosor de la línea
      }
    }]
      
    };

    Plotly.newPlot("layout_box", data, layout);

    

    const legendHtml = legend.map(item => {
  return `<div style="display: flex; align-items: center; margin-bottom: 5px;">
            <div style="width: 11px; height: 11px; background-color: ${item.color}; margin-right: 5px;"></div>
            <span style="font-size: 12px;">${item.label}</span>
          </div>`;
}).join("");

    document.getElementById("legend-container").innerHTML = legendHtml;
  });

const residuosHtml = desperdicios.map(region => {
  return `<p>Región: ${region.region}, Toneladas de residuos: ${region.toneladas.toLocaleString()}</p>`;
}).join("");

document.getElementById("residuos-info").innerHTML = residuosHtml;