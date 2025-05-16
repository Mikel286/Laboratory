function iniciarMapaResiduos() {
    Promise.all([
      fetch("regiones_chile.geojson").then(res => res.json()),
      fetch("residuos_regiones.json").then(res => res.json()),
      fetch("residuos_comunas.json").then(res => res.json())
    ])
    .then(([geojsonRegiones, datosResiduosRegiones, datosResiduosComunas]) => {
      const datosChoropleth = crearDatosChoropleth(geojsonRegiones, datosResiduosRegiones);
      const layoutChoropleth = crearLayoutChoropleth();
  
      Plotly.newPlot("contenedor-mapa", datosChoropleth, layoutChoropleth).then(divMapa => {
        configurarEventosHoverMapa(divMapa);
      });
    })
    .catch(error => console.error('Error al cargar los datos:', error));
  }

// Crear el dataset para el choropleth
function crearDatosChoropleth(geojsonRegiones, datosResiduosRegiones) {
    const nombresRegiones = datosResiduosRegiones.map(r => r.region);
    const toneladasResiduos = datosResiduosRegiones.map(r => r.toneladas);
  
    return [{
      type: "choropleth",
      geojson: geojsonRegiones,
      locations: nombresRegiones,
      z: toneladasResiduos,
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
  function crearLayoutChoropleth() {
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

  function configurarEventosHoverMapa(divMapa) {
    divMapa.on('plotly_hover', function(eventData) {
      const punto = eventData.points[0];
      const nombreRegion = punto.location;
      const toneladasRegion = punto.z;
  
      let infoHover = `Región: ${nombreRegion}<br>Toneladas: ${toneladasRegion.toLocaleString()}`;
      mostrarGraficoResiduosPorComuna(nombreRegion, infoHover)
    });
  
    divMapa.on('plotly_unhover', function() {
      document.getElementById("hover-info").innerHTML = "";
    });
  }

  function normalizarNombreRegion(nombreRegion) {
    // Equivalencias de nombres de regiones
    const equivalenciasRegiones = {
        "Santiago": "Región Metropolitana de Santiago",
        "Metropolitana": "Región Metropolitana de Santiago",
        "Region Metropolitana": "Región Metropolitana de Santiago",
        "Región Metropolitana": "Región Metropolitana de Santiago",
        "Aysen": "Aysén del General Carlos Ibáñez del Campo",
        "Aysen": "Aysén del General Carlos Ibáñez del Campo",
        "Magallanes": "Magallanes y de la Antártica Chilena",
        "Magallanes y Antártica": "Magallanes y de la Antártica Chilena"
    };
    for (const key in equivalenciasRegiones) {
        if (nombreRegion.trim().toLowerCase().includes(key.toLowerCase())) {
            return equivalenciasRegiones[key];
        }
    }
    return nombreRegion;
}

  function mostrarGraficoResiduosPorComuna(nombreRegion, infoHover) {
    nombreRegion = normalizarNombreRegion(nombreRegion);
    Promise.all([
        fetch('residuos_comunas.json').then(response => response.json()),
        fetch('poblacion_comunas_chile.json').then(response => response.json())
    ])
    .then(([datosResiduosComunas, datosPoblacionComunas]) => {
        // Normalizar nombres de región en residuos_comunas.json
        const comunasEnRegion = datosResiduosComunas.filter(comuna => normalizarNombreRegion(comuna.region) === nombreRegion);
        const graficoComunas = document.getElementById("grafico-comunas");

        if (comunasEnRegion.length > 0) {
            // Map commune names to population for quick lookup
            const mapaPoblacion = {};
            datosPoblacionComunas.forEach(entrada => {
                mapaPoblacion[normalizarNombreRegion(entrada.region) + '|' + entrada.comuna] = entrada.poblacion;
            });

            // Calculate per capita waste using population JSON
            const residuosPerCapita = comunasEnRegion.map(c => {
                const poblacion = mapaPoblacion[normalizarNombreRegion(c.region) + '|' + (c.comuna || c.nombre)];
                if (poblacion && c.cantidad_toneladas) {
                    return c.cantidad_toneladas * 1000 / poblacion; // toneladas to kg
                } else {
                    return null;
                }
            });
            const nombresComunas = comunasEnRegion.map(c => c.comuna || c.nombre);
            // Remove communes with missing data
            const comunasValidas = residuosPerCapita.map((v, i) => v !== null ? {nombre: nombresComunas[i], valor: v} : null).filter(x => x);
            const residuos = comunasValidas.map(x => x.valor);
            const nombresValidos = comunasValidas.map(x => x.nombre);
            const residuosPromedio = residuos.length > 0 ? residuos.reduce((sum, v) => sum + v, 0) / residuos.length : 0;
            infoHover += `<br>Promedio de residuos per cápita: ${residuosPromedio.toFixed(2)} kg/persona`;

            graficoComunas.style.display = 'block';
            if (window.chartComunas) {
                window.chartComunas.destroy();
            }
            window.chartComunas = new Chart(graficoComunas, {
                type: 'bar',
                data: {
                    labels: nombresValidos,
                    datasets: [{
                        label: 'Residuos per cápita (kg/persona)',
                        data: residuos,
                        backgroundColor: 'rgba(120,120,120,0.7)',
                        borderColor: 'rgba(80,80,80,1)',
                        borderWidth: 1,
                        // Aumenta el ancho de las barras
                        barPercentage: 1.0,
                        categoryPercentage: 1.0
                    }]
                },
                options: {
                    layout: {
                        padding: {
                            top: 40, // Mueve la gráfica más abajo
                            bottom: 20
                        }
                    },
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
            infoHover += "<br>No hay datos sobre comunas en esta región.";
            graficoComunas.style.display = 'none';
        }
        document.getElementById("hover-info").innerHTML = infoHover;
    })
    .catch(error => {
        console.error('Error al cargar las comunas o población:', error);
        document.getElementById("hover-info").innerHTML = "Error al cargar los datos de las comunas.";
    });
}
    
    // Inicia todo
    iniciarMapaResiduos();