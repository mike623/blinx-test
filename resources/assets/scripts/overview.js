import "../sass/app.scss";
import "../vendor/tailwind.css";
import { getTransaction } from "./api";
import Highcharts from "highcharts";
import { groupBy, orderBy, chain } from "lodash";

/**
 * entry point
 */
$(document).ready(async () => {
  const trans = await getTransaction();
  const { productGrowth, productPercentage } = aggregationData(trans);
  renderChart({
    pieChartData: productPercentage.map((i) => ({ ...i, y: i.data })),
    lineChartData: productGrowth,
  });
  
  $("a[href='/overview']").addClass("bg-gray-900");
});

function aggregationData(trans) {
  const sortedTrans = orderBy(trans, ["settled_at"], ["desc"]);
  const totalTransactions = sortedTrans.length;

  // group by
  const transMapByType = groupBy(sortedTrans, "item.type");

  const productPercentage = [];
  const productGrowth = [];

  /**
   * loop all transaction and:
   * calculate percentage of each product type
   * calculate month Revenue of each product type
   */
  for (const iterator of Object.entries(transMapByType)) {
    const [name, transactionList] = iterator;

    const monthRevenue = Array(12).fill(0);

    // calculate each revenue
    transactionList.forEach((element) => {
      monthRevenue[new Date(element.settled_at).getMonth()] +=
        element.item.price;
    });

    productPercentage.push({
      name,
      data: (transactionList.length / totalTransactions) * 100,
    });

    productGrowth.push({
      name,
      data: monthRevenue,
    });
  }

  return {
    productPercentage,
    productGrowth,
  };
}

/**
 * function to render chart
 */
function renderChart({ pieChartData, lineChartData }) {
  Highcharts.chart("pie-chart-container", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Transaction items type",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Type",
        colorByPoint: true,
        data: pieChartData,
      },
    ],
  });

  Highcharts.chart("line-chart-container", {
    title: {
      text: "Revenue in month by item type, 2021",
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 1,
      },
    },

    series: lineChartData,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });
}
