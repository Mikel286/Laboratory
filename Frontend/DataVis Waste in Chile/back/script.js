const paises = [
    { nombre: "Argentina", codigo: "ARG", consumo: Math.random() * 16 },
    { nombre: "Bolivia", codigo: "BOL", consumo: Math.random() * 16 },
    { nombre: "Brazil", codigo: "BRA", consumo: Math.random() * 16 },
    { nombre: "Canada", codigo: "CAN", consumo: Math.random() * 16 },
    { nombre: "Chile", codigo: "CHL", consumo: Math.random() * 16 },
    { nombre: "Colombia", codigo: "COL", consumo: Math.random() * 16 },
    { nombre: "Mexico", codigo: "MEX", consumo: Math.random() * 16 },
    { nombre: "United States", codigo: "USA", consumo: Math.random() * 16 }
  ];
  
  const data = [
    {
      type: 'choropleth',
      locations: ["CHL"],
      z: paises.map(p => p.consumo),
      locationmode: 'ISO-3',
      colorscale: [
        [0, 'rgb(255, 200, 200)'],
        [0.166, 'rgb(255, 200, 200)'],
        [0.166, 'rgb(240, 160, 160)'],
        [0.333, 'rgb(240, 160, 160)'],
        [0.333, 'rgb(225, 120, 120)'],
        [0.5, 'rgb(225, 120, 120)'],
        [0.5, 'rgb(210, 80, 80)'],
        [0.666, 'rgb(210, 80, 80)'],
        [0.666, 'rgb(195, 40, 40)'],
        [0.833, 'rgb(195, 40, 40)'],
        [0.833, 'rgb(220, 0, 0)'],
        [1, 'rgb(220, 0, 0)']
      ],
      zmin: 0,
      zmax: 18,
      text: paises.map(p => p.nombre),
      autocolorscale: false,
      reversescale: false,
      marker: {
        line: {
          color: 'rgb(180,180,180)',
          width: 0.5
        }
      },
      colorbar: {
        autotick: false,
        tickprefix: '',
        ticksuffix: ' L',
        tickvals: [0, 3, 6, 9, 12, 15, 18],
        ticktext: ['0 L', '3 L', '6 L', '9 L', '12 L', '15 L', '18 L'],
        orientation: 'v',
        x: 1.05,
        y: 0.5,
        len: 0.7,
        thickness: 20
      }
    }
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
      showland: true,
      showcoastlines: false,
      landcolor: 'rgb(217, 217, 217)',
      countrycolor: 'rgb(255, 255, 255)',
      showframe: false,
      projection: {
        type: 'equirectangular'
      },
      lonaxis: { range: [-180, 180] },
      lataxis: { range: [-90, 90] }
    },
    dragmode: false,
    scrollZoom: false
  };
  
  const config = {
    staticPlot: true,
    displayModeBar: false
  };
  
  Plotly.newPlot('mapa', data, layout, config);