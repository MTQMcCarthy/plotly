function DrawBarchart(sampleId)
{
    console.log(`Calling DrawBarchart(${sampleId})`);

    d3.json("samples.json").then((data) => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);

        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0,10).map(otuId => `OTU${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks, 
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }

        barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        };

        Plotly.newPlot("bar", barArray, barLayout);
    });
}

function DrawBubblechart(sampleId)
{
    console.log(`Calling DrawBubblechart(${sampleId})`);
//couldn't really get this to work, cobbled together from other examples
      var plotData = `/samples/${sampleId}`;
      d3.json("samples.json").then( data =>{
        let xAxis = data.otu_ids;
        let yAxis = data.sample_values;
        let size = data.sample_values;
        let color = data.otu_ids;
        let texts = data.otu_labels;
    
        let bubble = {
          x: xAxis,
          y: yAxis,
          text: texts,
          mode: `markers`,
          marker: {
            size: size,
            color: color
          }
        };
        var data = [bubble];
        let layout = {
          title: "Belly Button Bacteria",
          xaxis: {title: "OTU ID"}
        };
        Plotly.newPlot("bubble", data, layout);
        });
    };

function ShowMetadata(sampleId)
{
    console.log(`Calling ShowMetadata(${sampleId})`);

    d3.json("samples.json").then((data) => {

        var metadata = data.metadata;
        var resultArray = metadata.filter(md => md.id == sampleId);
        var result = resultArray[0];

        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");

        Object.entries(result).forEach(([key, value]) => {
            var textToShow = "${key} " + parseInt(value); 
            PANEL.append("h6").text(textToShow);
        });
    });
}

function DrawGauge(sampleId)
{
    console.log(`Calling DrawGauge(${sampleId})`);
}

function optionChanged(newSampleId) 
{
    console.log(`user selected ${newSampleId}`);

    DrawBubblechart(newSampleId);
    DrawBarchart(newSampleId);
    DrawGauge(newSampleId);
    ShowMetadata(newSampleId);
    
}

function InitDashboard()
{
    console.log("Initializing dashboard");

    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach((sampleId) => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });
        
        var sampleId = sampleNames[0];
        
        DrawBarchart(sampleId);
        DrawBubblechart(sampleId);
        DrawGauge(sampleId);
        ShowMetadata(sampleId);
    });
}

InitDashboard();