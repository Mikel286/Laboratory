function iniciarMapa() {
    Promise.all([
      fetch("regiones.json").then(res => res.json()),
      fetch("data.json").then(res => res.json()),
      fetch("sub_data.json").then(res => res.json())
    ])
    .then(([geojson, datos, comunas]) => {
      const data = crearDataChoropleth(geojson, datos);
      const layout = crearLayout();
  
      Plotly.newPlot("layout_box", data, layout).then(graphDiv => {
        configurarEventosHover(graphDiv);
      });
    })
    .catch(error => console.error('Error al cargar los datos:', error));
  }
  
  // Crear el dataset para el choropleth
  function crearDataChoropleth(geojson, datos) {
    const regiones = datos.map(r => r.region);
    const toneladas = datos.map(r => r.toneladas);
  
    return [{
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
      hoverinfo: "location+z",
      showscale: false
    }];
  }
  
  // Crear el diseño del gráfico
  function crearLayout() {
    return {
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
      }
    };
  }
  
  function configurarEventosHover(graphDiv) {
    graphDiv.on('plotly_hover', function(eventData) {
      const point = eventData.points[0];
      const region = point.location;
      obtenerInfoComunas(region);
    });
  
    graphDiv.on('plotly_unhover', function() {
      document.getElementById("hover-info").innerHTML = '<div id="grafico-comunas" style="width:400px; height:300px;"></div>';
    });
  }
  
  function obtenerInfoComunas(region) {
    fetch('sub_data.json')
    .then(response => response.json())
    .then(comunasData => {
      const comunasEnRegion = comunasData.filter(comuna => region.includes(comuna.region));
      if (comunasEnRegion.length > 0) {
        const comunas = comunasEnRegion.map(c => c.comuna);
        const residuos = comunasEnRegion.map(c => c.residuos_per_capita);
        grafico_barras('grafico-comunas', comunas, residuos);
      }
    })
    .catch(error => {
      console.error('Error al cargar los datos de las comunas:', error);
    });
  }
  
  function grafico_barras(id, comunas, residuos) {
    const graficoDiv = document.getElementById(id);
  
    if (!graficoDiv) {
      console.error('No se encontró el contenedor con id: ' + id);
      return;
    }
  
    // Mostrar el contenedor si estaba oculto
    graficoDiv.style.display = 'block';
  
    // Limpiar gráfico anterior si existe
    Plotly.purge(id);
  
    // Crear nuevo gráfico
    Plotly.newPlot(id, [{
      x: comunas,
      y: residuos,
      type: 'bar',
      name: 'Residuos per cápita'
    }], {
      title: 'Residuos per cápita por comuna',
      margin: { t: 100 }
    });
  }
  
  // Inicia el mapa solo cuando el DOM esté cargado
  window.addEventListener('DOMContentLoaded', iniciarMapa);
  