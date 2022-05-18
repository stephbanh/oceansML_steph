var sampledata;

// Use the D3 library to read in samples.json
d3.json("static/data/samples.json").then(function (data) {
  sampledata = data;
  console.log(sampledata);
  // let subjects = list of IDs from 'names'
  var subjects = sampledata.names;
  select = document.getElementById("selDataset");
  for (let i = 0; i < subjects.length; i++) {
    var opt = document.createElement("option");
    row = subjects[i];
    opt.value = row;
    opt.innerHTML = row;
    select.appendChild(opt);
  }
  optionChanged(sampledata.names[0]);
});

function optionChanged(selectedID) {
  // Grab the metadata for the selected ID
  // Loop through the array of data
  for (let i = 0; i < sampledata.metadata.length; i++) {
    row = sampledata.metadata[i];
    // Compare value to selected argument
    if (row.id == selectedID) {
      var ethnicity = row.ethnicity;
      var gender = row.gender;
      var age = row.age;
      var location = row.location;
      var bbtype = row.bbtype;
      var wfreq = row.wfreq;
    }
  }

  // subject info card
  d3.select("#sample-metadata").html(`<strong>id</strong>: ${selectedID} <br>
            <strong>ethnicity</strong>: ${ethnicity}<br>
            <strong>gender</strong>:  ${gender}<br>
            <strong>age</strong>: ${age}<br>
            <strong>location</strong>: ${location}<br>
            <strong>belly button type</strong>: ${bbtype}<br>
            <strong>wash frequency</strong>: ${wfreq}`);

  // Create a horizontal bar chart with a dropdown menu to display the
  // top 10 OTUs found in that individual.
  for (let i = 0; i < sampledata.samples.length; i++) {
    row = sampledata.samples[i];

    // Compare value to selected argument
    if (row.id == selectedID) {
      var otu_IDs = row.otu_ids;
      var otu_labels = row.otu_labels;
      var sample_values = row.sample_values;
    }
  }

  // Bar chart!
  let BarData = [
    {
      type: "bar",
      x: sample_values.slice(0, 10),
      y: otu_IDs.slice(0, 10).map((id) => "OTU " + id.toString()),
      text: otu_labels.slice(0, 10),
      orientation: "h",
      transforms: [
        {
          type: "sort",
          target: "y",
          order: "descending",
        },
      ],
      marker: { color: "#a60059" },
    },
  ];
  // Render the plot to the div tag with id "bar"
  Plotly.newPlot("bar", BarData);

  // Bubble chart!
  let BubbleData = [
    {
      x: otu_IDs,
      y: sample_values,
      mode: "markers",
      text: otu_labels,
      marker: {
        color: otu_IDs,
        opacity: otu_IDs,
        size: sample_values,
        showscale: true,
        colorscale: "Bluered",
      },
    },
  ];
  var BubbleLayout = {
    title: {
      text: "<b>Count of all Fish in Section</b><br><i>Colors indicate the various species. Size indicates prevalence in section.</i>",
    },
    xaxis: { title: { text: "OTU ID" } },
  };
  // Render the plot to the div tag with id "bubble"
  Plotly.newPlot("bubble", BubbleData, BubbleLayout);

  // Gauge chart!

  // Trig to draw the gauge needle
  function gaugePointer(value) {
    var degrees = 180 - value * 20;
    var radius = 0.5;
    var radians = (degrees * Math.PI) / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path for the gauge needle
    var mainPath = "M -.0 -0.035 L .0 0.035 L ",
      pathX = String(x),
      space = " ",
      pathY = String(y),
      pathEnd = " Z";
    var path = mainPath.concat(pathX, space, pathY, pathEnd);
    return path;
  }

  var data = [
    {
      type: "scatter",
      x: [0],
      y: [0],
      marker: { size: 18, color: "ff0000" },
      showlegend: false,
    },
    {
      values: [
        50 / 9,
        50 / 9,
        50 / 9,
        50 / 9,
        50 / 9,
        50 / 9,
        50 / 9,
        50 / 9,
        50 / 9,
        50,
      ],
      rotation: 90,
      text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
      textinfo: "text",
      textposition: "inside",
      direction: "clockwise",
      marker: {
        colors: [
          "#d3002c",
          "#cd0032",
          "#a1005e",
          "#980067",
          "#8f0070",
          "#5400ab",
          "#3e00c1",
          "#2100de",
          "#0000ff",
          "rgba(255, 255, 255, 0)",
        ],
      },
      hole: 0.5,
      type: "pie",
      showlegend: false,
    },
  ];

  //   layout to move the needle
  var needlePos = {
    shapes: [
      {
        type: "path",
        path: gaugePointer(wfreq),
        fillcolor: "ff0000",
        line: {
          color: "ff0000",
        },
      },
    ],
    autosize: true,
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1],
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1],
    },
    title: `<b>Country</b> <br> Something per Week`,
  };
  // Render the plot to the div tag with id "gauge"
  Plotly.newPlot("gauge", data, needlePos);
}
