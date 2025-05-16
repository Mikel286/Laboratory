// Con esta funcion iniciamos la carga del mapa
function iniciarMapa() {
    Promise.all([
      fetch("regiones.json").then(res => res.json()), // 
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
    // Población por región (2024)
    const poblacion = [
      { region: "Región de Antofagasta", poblacion: 635416 },
      { region: "Región de La Araucanía", poblacion: 1010423 },
      { region: "Región de Arica y Parinacota", poblacion: 244569 },
      { region: "Región de Atacama", poblacion: 299180 },
      { region: "Región de Aysén del Gral.Ibañez del Campo", poblacion: 100745 },
      { region: "Región del Bío-Bío", poblacion: 1613059 },
      { region: "Región de Coquimbo", poblacion: 832864 },
      { region: "Región del Libertador Bernardo O'Higgins", poblacion: 987228 },
      { region: "Región de Los Lagos", poblacion: 890284 },
      { region: "Región de Los Ríos", poblacion: 398230 },
      { region: "Región de Magallanes y Antártica Chilena", poblacion: 166537 },
      { region: "Región del Maule", poblacion: 1123008 },
      { region: "Región Metropolitana de Santiago", poblacion: 7400741 },
      { region: "Región de Tarapacá", poblacion: 369806 },
      { region: "Región de Valparaíso", poblacion: 1896053 },
      { region: "Región de Ñuble", poblacion: 512289 }
    ];
    // Calcular residuos per cápita por región
    const regiones = datos.map(r => r.region);
    const toneladas = datos.map(r => r.toneladas);
    const residuosPerCapita = regiones.map((region, i) => {
      const pob = poblacion.find(p => p.region === region)?.poblacion || 1;
      return toneladas[i] / pob;
    });
    return [{
      type: "choropleth",
      geojson: geojson,
      locations: regiones,
      z: residuosPerCapita,
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
      zmax: Math.max(...residuosPerCapita),
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
      const valor = point.z;
      // Oculta el top 5 y muestra el gráfico de comunas solo si hay hover sobre una región
      document.getElementById('top5-comunas').style.display = 'none';
      document.getElementById('grafico-comunas').style.display = 'block';
      obtenerInfoComunas(region);
      const residuo = 250; // en kg
      actualizarBarra(residuo, 500, 0, 300);
    });

    graphDiv.on('plotly_unhover', function() {
      // Al salir de la región, muestra el top 5 y oculta el gráfico de comunas
      document.getElementById('top5-comunas').style.display = 'block';
      document.getElementById('grafico-comunas').style.display = 'none';
      // Limpia el gráfico de comunas
      Plotly.purge('grafico-comunas');
    });

    const sound = new Tone.Player("music/sound.mp3").toDestination();

    graphDiv.on('plotly_click', function(){
      Tone.start(); // Necesario para desbloquear el contexto de audio
      sound.start();
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
  
    // Determinar el índice del valor máximo
    const maxIndex = residuos.indexOf(Math.max(...residuos));
  
    // Crear un arreglo de colores: todos grises excepto el máximo en rojo
    const colores = residuos.map((_, i) => i === maxIndex ? '#d62828' : '#808080');
  
    graficoDiv.style.display = 'block';
    Plotly.purge(id);
    Plotly.newPlot(id, [{
      x: comunas,
      y: residuos,
      type: 'bar',
      name: 'Residuos per cápita',
      marker: {
        color: colores,
        line: { color: '#333', width: 1 }
      },
      hoverlabel: { bgcolor: '#fff', font: { color: '#000' } }
    }], {
      title: 'Residuos per cápita por comuna',
      margin: { t: 100 },
      plot_bgcolor: '#fff',
      paper_bgcolor: '#fff',
      font: { color: '#222', family: 'Arial', size: 14 },
      xaxis: { showgrid: false, zeroline: false },
      yaxis: { showgrid: false, zeroline: false },
      showlegend: false
    }, { displayModeBar: false });
  }
  

  function actualizarBarra(valor, maximo, minimo, anchoTotal) {
    // Limitar el valor dentro del rango
    const clamped = Math.max(minimo, Math.min(maximo, valor));
    
    // Normalizar el valor a un porcentaje del ancho total
    const porcentaje = (clamped - minimo) / (maximo - minimo);
    const ancho = porcentaje * anchoTotal;
  
    // Debug
    console.log(`Valor: ${valor}, Normalizado: ${porcentaje}, Ancho en px: ${ancho}`);
  
    // Actualizar el ancho del rectángulo
    document.getElementById("barra-relleno").setAttribute("width", ancho);
  }
  
  
  // Inicia el mapa solo cuando el DOM esté cargado
  window.addEventListener('DOMContentLoaded', iniciarMapa);
