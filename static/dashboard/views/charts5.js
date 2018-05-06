window.onload = default_;
var selectedDep="";
var selectedYear="";
$('#year-selector').change(function () {
    // erase old data from chart when update data 
    if (window.chart !== undefined || window.chart !== null) {
        window.chart.destroy();
    }
    selectedYear = $('#year-selector option:selected').val();
    send_request();
});
$('#department-selector').change(function () {
    if (window.chart !== undefined || window.chart !== null) {
        window.chart.destroy();
    }
    selectedDep = $('#department-selector option:selected').val();
    send_request();
});

function send_request() {
    'use strict';
    var depId = 'department_id=' + selectedDep + '';
    var yId = '&year_id=' + selectedYear + '';
    var bUrl = request_url + '?';
    var aUrl = bUrl + depId + yId;

    $.ajax({
        url: aUrl,
        dataType: "json",
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            var label_data = []; //year
            var review_item_label = []; // item_name
            var review_item = {};

            for (var i = 0; i < data.result.length; i++) {
                if (!label_data.includes(data.result[i].year)) {
                    label_data.push(data.result[i].year);
                }
                if (review_item_label.includes(data.result[i].review_item__name)) {
                    review_item[data.result[i].review_item__name].push(data.result[i].rate__avg);
                } else {
                    review_item_label.push(data.result[i].review_item__name);
                    review_item[data.result[i].review_item__name] = new Array();
                    review_item[data.result[i].review_item__name].push(data.result[i].rate__avg);

                }

            }


            var colors = [];
            for (var i = 0; i < review_item_label.length; i++) {
                colors.push('' + randomScalingFactor() + ',' + randomScalingFactor() + ',' + randomScalingFactor() + ',');
            }

            var datasetss = [];
            for (var i = 0; i < review_item_label.length; i++) {
                datasetss.push({
                    label: review_item_label[i],
                    backgroundColor: 'rgba(' + colors[i] + '0.2)',
                    borderColor: 'rgba(' + colors[i] + '1)',
                    pointBackgroundColor: 'rgba(' + colors[i] + '1)',
                    pointBorderColor: '#fff',
                    data: review_item[review_item_label[i]]
                });

            }

            var barChartData = {
                labels: label_data,
                datasets: datasetss
            }

            var ctx = document.getElementById('canvas-1');
            // erase old data from chart when update data 
            if (window.chart !== undefined || window.chart !== null) {
                window.chart.destroy();
            }
            window.chart = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

        }
    });

    var randomScalingFactor = function () {
        return Math.round(Math.random() * 255)
    };
}

function default_() {
    'use strict';
    var randomScalingFactor = function () {
        return Math.round(Math.random() * 255)
    };

    var data = educatorsRatingData;

    var label_data = [];
    var review_item_label = [];
    var review_item = {};

    for (var i = 0; i < data.length; i++) {
        if (!label_data.includes(data[i].year)) {
            label_data.push(data[i].year);
        }
        if (review_item_label.includes(data[i].review_item__name)) {
            review_item[data[i].review_item__name].push(data[i].rate__avg);
        } else {
            review_item_label.push(data[i].review_item__name);
            review_item[data[i].review_item__name] = [];
            review_item[data[i].review_item__name].push(data[i].rate__avg);

        }

    }


    var colors = [];
    for (var i = 0; i < review_item_label.length; i++) {
        colors.push('' + randomScalingFactor() + ',' + randomScalingFactor() + ',' + randomScalingFactor() + ',');
    }
    var datasetss = [];
    for (var i = 0; i < review_item_label.length; i++) {
        datasetss.push({
            label: review_item_label[i],
            backgroundColor: 'rgba(' + colors[i] + '0.2)',
            borderColor: 'rgba(' + colors[i] + '1)',
            pointBackgroundColor: 'rgba(' + colors[i] + '1)',
            pointBorderColor: '#fff',
            data: review_item[review_item_label[i]]
        });

    }

    var lineChartData = {
        labels: label_data,
        datasets: datasetss
    };

    var ctx = document.getElementById('canvas-1');
    window.chart = new Chart(ctx, {
        type: 'bar',
        data: lineChartData,
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 3
                    }
                }]
            }
        }
    });


}