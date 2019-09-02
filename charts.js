window.onload = function () {
    let endPoint = "https://public.redmist.gg/v1/cards";
    let pieChartData = [];

    $.getJSON(endPoint, ((ele) => {

        let cards = ele.cards;
        let totalPrice = 0;
        cards.forEach(card => {
            let price = card.type == 'hero' ? card.price : 3 * (card.price);
            totalPrice += price;
            // for (var i = 0; i < cards.length; i++) {
            //     var sum;
            //     sum += cards[i].price;
            // }
            // console.log(sum);
        });

        cards.forEach(card => {
            let price = card.type == 'hero' ? card.price : 3 * (card.price);
            let percentage = price / totalPrice * 100;
            let priceToFixed = price.toFixed(2);
            if (price > 0) {
                pieChartData.push({ label: card.name, y: percentage, unitPrice: priceToFixed });
            }
        });



        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light2",
            animationEnabled: true,
            title: {
                text: "Shares of Artifact cards' price",
                fontSize: 25
            },
            subtitles: [{
                text: "Eudora Neves, 2019",
                fontSize: 13
            }],
            data: [{
                type: "pie",
                indexLabelFontSize: 9,
                radius: 600,
                indexLabel: "{label} - {y} - '$'{unitPrice}",
                yValueFormatString: "###0.0\"%\"",
                click: explodePie,

                dataPoints: pieChartData, //dataPoints should be an array
                //[
                // { y: 42, label: "Gas" },
                // { y: 21, label: "Nuclear" },
                // { y: 24.5, label: "Renewable" },
                // { y: 9, label: "Coal" },
                // { y: 3.1, label: "Other Fuels" }
                //]            
            }]
        });
        chart.render();

        function explodePie(e) {
            for (var i = 0; i < e.dataSeries.dataPoints.length; i++) {
                if (i !== e.dataPointIndex)
                    e.dataSeries.dataPoints[i].exploded = false;
            }
        }


    }))

}