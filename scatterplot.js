// Assign the specification to a local variable vlSpec.
var lineChart_2019 = {
  width: 200,
  height: 200,
  $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
  title: "Canadian Unemployment Rate 2019",
  data: {
    "url": "unemployment.json"
  },
  transform:[
    {filter: {field: 'GEO', equal: 'Canada'},
  }
  ],
  mark: 'line',
  encoding: {
    y: {
      field: 'UNEMP_RATE_19',
      type: 'quantitative',
      scale: {
        domainMax: 25
      },
      axis: {
        title: 'Unemployment Rate'
      }
    },
    x: {
      field: 'REF_DATE',

      type:'ordinal',
      axis: {
        title: 'Months'
      }
    },
    color: {
      field: "NAICS",
      type: "nominal",
      title: "Industry",
    }
  }

};

var lineChart_2020 = {
  width: 200,
  height: 200,
  $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
  title: "Canadian Unemployment Rate 2020",
  data: {
    "url": "unemployment.json"
  },
  transform:[
    {filter: {field: 'GEO', equal: 'Canada'},
  }
  ],
  mark: 'line',
  encoding: {
    y: {
      field: 'UNEMP_RATE_20',
      type: 'quantitative',
      axis: {
        title: 'Unemployment Rate'
      },

      scale: {
        domainMax: 25
      },
    },
    x: {
      field: 'REF_DATE',

      type:'ordinal',
      axis: {
        title: 'Months'
      }
    },
    color: {
      field: "NAICS",
      type: "nominal",
      title: "Industry",
    }
  }

};



// Embed the visualization in the container with id `vis`
vegaEmbed('#vis_2019', lineChart_2019);
vegaEmbed('#vis_2020', lineChart_2020);
