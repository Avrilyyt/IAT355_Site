
  //Slider attributes
  var slider = document.getElementById("range");
  var output = document.getElementById("output");

  var checkedBox = document.querySelector('.filterbox:checked').value;

  var chartTitles = document.querySelectorAll('#industry');

  chartTitles[0].innerHTML = checkedBox;
  chartTitles[1].innerHTML = checkedBox;

  var month = "01";
  output.innerHTML = numberToValue(slider.value);


    // Frame attributes
    var w = 700;
    var h = 700;
    var svg = d3.select(".container").append("svg").attr("width", w).attr("height", h);
    var svg_2 = d3.select(".container").append("svg").attr("width", w).attr("height", h);
    //projection stats
    var projection = d3.geoAzimuthalEqualArea()
    .rotate([100, -45])
    .center([5, 20])
    .scale(700)
    .translate([w/2, h/2]);

    var unemploymentByProv = d3.map();
    var unemploymentByProv_2 = d3.map();

    //determine bins
    var quantize = d3.scaleQuantize()
    .domain([0, 20])
    .range(["class0", "class1", "class2", "class3", "class4"]);

    //First Map - before load
    d3.queue().defer(d3.json, "canada.json").defer(d3.csv, "unemployment.csv", function(d){
      if(month == d.REF_DATE){

        if(d.NAICS == checkedBox){
          unemploymentByProv.set(d.GEO, +d.UNEMP_RATE_19);
        }
      }
    }).await(binder);

    //Second Map - before load
    d3.queue().defer(d3.json, "canada.json").defer(d3.csv, "unemployment.csv", function(d){
      if(month == d.REF_DATE){
        if(d.NAICS == checkedBox){
          unemploymentByProv_2.set(d.GEO, +d.UNEMP_RATE_20);
        }
      }
    }).await(binder_2);

    //d3 queue
    slider.oninput = function(){
      output.innerHTML = numberToValue(this.value);
      checkedBox = document.querySelector('.filterbox:checked').value;

      chartTitles[0].innerHTML = checkedBox;
      chartTitles[1].innerHTML = checkedBox;

      parseMonth(this.value);
      parseMonth(this.value);

        d3.queue().defer(d3.json, "canada.json").defer(d3.csv, "unemployment.csv", function(d){
          if(month == d.REF_DATE){

            if(d.NAICS == checkedBox){
              unemploymentByProv.set(d.GEO, +d.UNEMP_RATE_19);
            }
          }
        }).await(binder);

        d3.queue().defer(d3.json, "canada.json").defer(d3.csv, "unemployment.csv", function(d){
          if(month == d.REF_DATE){
            if(d.NAICS == checkedBox){
              unemploymentByProv_2.set(d.GEO, +d.UNEMP_RATE_20);
            }
          }
        }).await(binder_2);

      }
    //dictionary
    var path = d3.geoPath().projection(projection);

    //draws the 2019 map
    function binder(error, can){


      d3.select("svg").remove();
      var svg = d3.select(".container").append("svg").attr("width", w).attr("height", h);

      svg.append("g")
      .attr("class", "provinces")
      .selectAll("path")
      .data(can.features)
      .enter()
      .append("path")
      .attr("class", function(d) {

        return quantize(unemploymentByProv.get(d.properties.NAME));
      })
      .attr("d", path);
    };

    //draws the 2020 map
    function binder_2(error, can){
      d3.select("svg").remove();
      var svg_2 = d3.select(".container").append("svg").attr("width", w).attr("height", h);
      svg_2.append("g")
      .attr("class", "provinces")
      .selectAll("path")
      .data(can.features)
      .enter()
      .append("path")
      .attr("class", function(d) {
        return quantize(unemploymentByProv_2.get(d.properties.NAME));
      })
      .attr("d", path);
    };


    //parses the slider value to a month
    function parseMonth(value){
      monthConcat = "01";
      if(value == 2){
        monthConcat = "02";
      }
      else if(value == 3){
        monthConcat = "03";
      }
      else if(value == 4){
        monthConcat = "04";
      }
      else if(value == 5){
        monthConcat = "05";
      }
      else if(value == 6){
        monthConcat = "06";
      }
      else if(value == 7){
        monthConcat = "07";
      }
      else if(value == 8){
        monthConcat = "08";
      }
      else if(value == 9){
        monthConcat = "09";
      }
      else if(value == 10){
        monthConcat = "10";
      }
      else if(value == 11){
        monthConcat = "11";
      }
      else if(value == 12){
        monthConcat = "12";
      }

      month = monthConcat;

    }
    function numberToValue(value){
      if(value == 1){
        return "January";
      }
      else if(value == 2){
        return "February";
      }
      else if(value == 3){
        return "March";
      }
      else if(value == 4){
        return "April";
      }
      else if(value == 5){
        return "May";
      }
      else if(value == 6){
        return "June";
      }
      else if(value == 7){
        return "July";
      }
      else if(value == 8){
        return "August";
      }
      else if(value == 9){
        return "September";
      }
      else if(value == 10){
        return "October";
      }

      return "November";
    }
