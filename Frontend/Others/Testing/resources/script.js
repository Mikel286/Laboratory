
function iniciarMapa() {
    Promise.all([
      fetch("regiones.json").then(res => res.json()),
      fetch("data.json").then(res => res.json()),
      fetch("sub_data.json").then(res => res.json())
    ])
    .then(([geojson, datos, comunas]) => {
      const data = crearDataChoropleth(geojson, datos);
      const layout = crearLayout();
  
      // Este then devuelve el objeto del gráfico (graphDiv)
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
      },
      shapes: [
        {
          type: "line",
          x0: -62.6373209,
          y0: -38.710133,
          x1: -50,
          y1: -38.710133,
          line: {
            color: "blue",
            width: 2
          }
        }
      ]
    };
  }

  function configurarEventosHover(graphDiv) {
    graphDiv.on('plotly_hover', function(eventData) {
      const point = eventData.points[0];
      const region = point.location;
      const toneladas = point.z;
  
      const info_base = `Región: ${region}<br>Toneladas: ${toneladas.toLocaleString()}`;
      document.getElementById("hover-info").innerHTML = info_base;
      obtenerInfoComunas(region, info_base)
    });
  
    graphDiv.on('plotly_unhover', function() {
      document.getElementById("hover-info").innerHTML = "";
    });
  }

  function obtenerInfoComunas(region, info) {
    fetch('sub_data.json')
    .then(response => response.json())
    .then(comunasData => {
        const comunasEnRegion = comunasData.filter(comuna => region.includes(comuna.region));

        const grafico = document.getElementById("grafico-comunas");

        if (comunasEnRegion.length > 0) {
            const residuosPromedio = comunasEnRegion.reduce((sum, comuna) => sum + comuna.residuos_per_capita, 0) / comunasEnRegion.length;
            info += `<br>Promedio de residuos per cápita: ${residuosPromedio.toFixed(2)} kg/persona`;

            // Extraer nombres y valores
            const nombres = comunasEnRegion.map(c => c.nombre);
            const residuos = comunasEnRegion.map(c => c.residuos_per_capita);

            // Mostrar canvas si estaba oculto
            grafico.style.display = 'block';

            // Destruir gráfico anterior si existe
            if (window.chartComunas) {
                window.chartComunas.destroy();
            }

            // Crear nuevo gráfico
            window.chartComunas = new Chart(grafico, {
                type: 'bar',
                data: {
                    labels: nombres,
                    datasets: [{
                        label: 'Residuos per cápita (kg/persona)',
                        data: residuos,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Kg/persona'
                            }
                        },
                        x: {
                            ticks: {
                                autoSkip: false,
                                maxRotation: 90,
                                minRotation: 45
                            }
                        }
                    }
                }
            });

        } else {
            info += "<br>No hay datos sobre comunas en esta región.";
            grafico.style.display = 'none'; // Ocultar si no hay datos
        }

        document.getElementById("hover-info").innerHTML = info;
    })
    .catch(error => {
        console.error('Error al cargar las comunas:', error);
        document.getElementById("hover-info").innerHTML = "Error al cargar los datos de las comunas.";
    });
}


    
    // Inicia todo
    iniciarMapa();