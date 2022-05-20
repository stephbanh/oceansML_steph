var summarydata;
  d3.json('static/data/all_vessels_summary.json').then(function(data) {
    summarydata = data;
    var years = [2012, 2013, 2014, 2015, 2016];
    select = document.getElementById("selYear");
    for (let i = 0; i < years.length; i++) {
      var opt = document.createElement("option");
      row = years[i];
      opt.value = row;
      opt.innerHTML = row;
      select.appendChild(opt);
    }
    yearChanged(2012);
  });

var vtype = [];
var numvessels = [];
var datapoints = [];
function yearChanged(selectedYear) {
  vtype = [];
  numvessels = []
  datapoints = []
  // Grab the summary data for the selected year
  // Loop through the array of data
  for (let i = 0; i < summarydata.length; i++) {
    row = summarydata[i];
    // Compare value to selected argument
    if (row.Year === Number(selectedYear)) {
      vtype.push(row['Vessel Type']);
      numvessels.push(row['Num of Vessels']);
      datapoints.push(row['Data Points']);
    }
  }

  d3.select("#title1").html(`${vtype[0]}`);
  d3.select("#title2").html(`${vtype[1]}`);
  d3.select("#title3").html(`${vtype[2]}`);
  d3.select("#title4").html(`${vtype[3]}`);
  d3.select("#title5").html(`${vtype[4]}`);
  d3.select("#v2").html(`Unique Vessels: ${numvessels[1]}<br>Total data points: ${datapoints[0]}`);
  d3.select("#v3").html(`Unique Vessels: ${numvessels[2]}<br>Total data points: ${datapoints[1]}`);
  d3.select("#v1").html(`Unique Vessels: ${numvessels[0]}<br>Total data points: ${datapoints[2]}`);
  d3.select("#v4").html(`Unique Vessels: ${numvessels[3]}<br>Total data points: ${datapoints[3]}`);
  d3.select("#v5").html(`Unique Vessels: ${numvessels[4]}<br>Total data points: ${datapoints[4]}`);
  
};