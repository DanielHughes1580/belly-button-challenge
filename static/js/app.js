const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then(function(data) {
    console.log(data);
  });

function init() {

    let dropdownMenu = d3.select("#selDataset");

    d3.json(url).then((data) => {
        let names =  data.names
        console.log(names);
        for (id of names){
            dropdownMenu.append("option").text(id).property("value",id)
        };
  

    let first_entry = names[0];
    console.log(first_entry);

    plotBar(first_entry);
    plotBubble(first_entry);
    genMetadata(first_entry);
  })
}
  function plotBar(sample){
    d3.json(url).then((data) => {
        let sample_data = data.samples;
        let result = sample_data.filter(value => value.id == sample);
        let bar_res = result[0]
        let otu_ids = bar_res.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse();
        let otu_labels = bar_res.otu_labels.slice(0,10).reverse();
        let sample_values = bar_res.sample_values.slice(0,10).reverse();
        console.log(otu_ids);
        console.log(otu_labels);
        console.log(sample_values);
        let bar_trace = {
            x:sample_values,
            y:otu_ids,
            text: otu_labels,
            type: 'bar',
            orientation: "h"
        }
        let bar_layout = {title: "Top Ten OTUs"};
        Plotly.newPlot("bar", [bar_trace], bar_layout);
    })
  }

  function plotBubble(sample){
    d3.json(url).then((data) => {
        let sample_data = data.samples;
        let result = sample_data.filter(value => value.id == sample);
        let bub_res = result[0]
        let otu_ids = bub_res.otu_ids.reverse();
        let otu_labels = bub_res.otu_labels.reverse();
        let sample_values = bub_res.sample_values.reverse();
        console.log(otu_ids);
        console.log(otu_labels);
        console.log(sample_values);
        let bub_trace = {
            x:otu_ids,
            y:sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
              size: sample_values,
              color: otu_ids,
            }
        }
        let bub_layout = {title: "Bacteria Count for each Sample ID",
                      xaxis: {title: "OTU ID"},
                      yaxis: {title: "Number of Bacteria"},
                     };
        Plotly.newPlot("bubble", [bub_trace], bub_layout);
    })
  }

  function genMetadata(sample){
    d3.json(url).then((data) => {
      let meta_data =  data.metadata;
      let met_result = meta_data.filter(value => value.id == sample);
      let res_meta = met_result[0];
      console.log(res_meta);
      let PANEL = d3.select("#sample-metadata");
      PANEL.html("");
      PANEL.text("");
      Object.entries(res_meta).forEach(([key,value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      })
    })
    }

function optionChanged(sample){
  plotBar(sample);
  plotBubble(sample);
  genMetadata(sample);
}

init();