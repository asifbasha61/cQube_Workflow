import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import * as Highcharts from 'highcharts/highstock';
import * as GroupedCategories from 'highcharts-grouped-categories/grouped-categories';
GroupedCategories(Highcharts);

@Component({
  selector: 'app-multi-bar-chart',
  templateUrl: './multi-bar-chart.component.html',
  styleUrls: ['./multi-bar-chart.component.css']
})
export class MultiBarChartComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions;

  //chart data variables
  @Input() public category: String[];
  @Input() public data: Number[];
  @Input() public enrolData: Number[];
  @Input() public compData: Number[];
  @Input() public percentData: Number[];
  @Input() public xData: Number[];
  @Input() public xAxisLabel: String;
  @Input() public yAxisLabel: String;
  @Input() public reportName: String;
  @Input() public level: String;
  @Input() public type: String;
  @Input() height: any = window.innerHeight;

  constructor(public changeDetection: ChangeDetectorRef) {
  }

  onResize() {
    // GroupedCategories(Highcharts);
    this.height = window.innerHeight;
    this.createBarChart();
  }


  ngOnInit() {
    // GroupedCategories(Highcharts);
    this.changeDetection.detectChanges();
    this.onResize();
  }

  //generate bar chart:::::::::::
  createBarChart() {
    var xData = this.xData;
    var name = this.reportName;
    var level = this.level;
    var type = this.type;
    let scrollBarX
    if (this.data.length < 25) {
      scrollBarX = false
    } else {
      scrollBarX = true
    }

    this.chartOptions = {
      chart: {
        type: "bar",
        backgroundColor: 'transparent',
      },
     
      title: {
        text: null
      },
      xAxis: {
       
        labels: {
          x: -7,
          style: {
            color: 'black',
            fontSize: this.height > 1760 ? "32px" : this.height > 1160 && this.height < 1760 ? "22px" : this.height > 667 && this.height < 1160 ? "12px" : "10px"
          }
        },
        type: "category",
        gridLineColor: 'transparent',
        categories: this.category,
        
        title: {
          text: this.yAxisLabel,
          style: {
            color: 'black',
            fontSize: this.height > 1760 ? "32px" : this.height > 1160 && this.height < 1760 ? "22px" : this.height > 667 && this.height < 1160 ? "12px" : "10px",
            fontWeight: "bold"
          }
        },
        min: 0,
        max: 25,
        scrollbar: {
          minWidth: 6,
          enabled: scrollBarX,
        },
        tickLength: 0
      },
      yAxis: {
        labels: {
          style: {
            color: 'black',
            fontSize: this.height > 1760 ? "26px" : this.height > 1160 && this.height < 1760 ? "16px" : this.height > 667 && this.height < 1160 ? "12px" : "10px"
          },
          formatter: function () {
            return this.value.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
          },
        },
       
        min: 0,
        opposite: true,
        // max: Math.max.apply(Math, this.data),
        max: 100,
        gridLineColor: 'transparent',
        title: {
          // text: this.xAxisLabel,
          text: "Percentage",
          style: {
            color: 'black',
            fontSize: this.height > 1760 ? "32px" : this.height > 1160 && this.height < 1760 ? "22px" : this.height > 667 && this.height < 1160 ? "12px" : "10px",
            fontWeight: "bold"
          }
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          },
          colors: [
            '#7cb5ec', '#434348', '#90ed7d'
        ],
        },
        series: {
          pointPadding: 0,
          groupPadding: 0.1,
          // pointWidth: 5,
        }
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false
      },
      series: [
        {
          dataLabels: {
            enabled: true,
            style: {
              fontWeight: 1,
              fontSize: this.height > 1760 ? "32px" : this.height > 1160 && this.height < 1760 ? "22px" : this.height > 667 && this.height < 1160 ? "12px" : "10px",
            },
            formatter: function () {
              return this.y.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
            }
          },
          colorByPoint: true,
          name: this.xAxisLabel,
          data: this.data,
         
        },
        
        
      ],
      tooltip: {
        style: {
          fontSize: this.height > 1760 ? "32px" : this.height > 1160 && this.height < 1760 ? "22px" : this.height > 667 && this.height < 1160 ? "12px" : "10px",
          opacity: 1,
          backgroundColor: "white"
        },
        formatter: function () {
          return '<b>' + getPointCategoryName(this.point, name, xData, level, type, this.series) + '</b>';
        },
        
        
      }
    }
    this.Highcharts.chart("container", this.chartOptions);

    //Bar tooltips::::::::::::::::::::::
    function getPointCategoryName(point, reportName, xData, level, type, series) {
      var obj = '';
      

      if (reportName == "course") {
        let percentage = ((point.y / point.series.yData.reduce((a, b) => a + b, 0)) * 100).toFixed(2);
        obj = `<b>District Name:</b> ${point.category}
        <br> ${point.y !== null ? `<b>Total Content Plays:</b> ${point.y.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}` : ''}
        <br> ${point.y !== null ? `<b>Percentage:</b> ${percentage} %` : ''}`
        return obj;
      }
      if (reportName == "textbook") {
        let percentage = ((point.y / point.series.yData.reduce((a, b) => a + b, 0)) * 100).toFixed(2);
        obj = `<b>District Name:</b> ${point.category}
        <br> ${point.y !== null ? `<b>Total Content Plays:</b> ${point.y.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}` : ''}
        <br> ${point.y !== null ? `<b>Percentage: ${percentage} %` : ''}</b>`
        return obj;
      }
      if (reportName == "completion") {
        obj = `<b>${level.charAt(0).toUpperCase() + level.substr(1).toLowerCase()} Name:</b> ${point.category}
        <br> ${point.y !== null ? `<b>Completion Percentage: </b>${point.y} %` : ''}`
        return obj;
      }
      if (reportName == "enroll/comp") {
        // obj = `<b>${level.charAt(0).toUpperCase() + level.substr(1).toLowerCase()} Name:</b> ${point.category}
        //  <br> ${point.y !== null ? `<b>${type.charAt(0).toUpperCase() + type.substr(1).toLowerCase()}:</b> ${point.y.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}` : ''}
        // ${type != `completion` && xData[point.index] ? `<br><span style="color: red"><b>Completion: </b>${xData[point.index].toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</span>` : ''}
        // ${type != `enrollment` && xData[point.index] ? `<br><b>Enrollment: </b>${xData[point.index].toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}` : ''}
        // `

      //   obj = `<b>${level.charAt(0).toUpperCase() + level.substr(1).toLowerCase()} Name:</b> ${point.category.parent.name}
      //   <br> ${point.y !== null ? `<b style= 'color: blue'>${type.split('_').length > 1 ?
      //       type.split('_')[0].charAt(0).toUpperCase() + type.split('_')[0].substr(1).toLowerCase() + " " + type.split('_')[1].charAt(0).toUpperCase() + type.split('_')[1].substr(1).toLowerCase() :
      //       type.charAt(0).toUpperCase() + type.substr(1).toLowerCase()}:</b> <span style ="color:blue">${point.y.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</span>` : ''}
      //  ${type == `completion` && xData[point.index] ? `<br><b>Enrollment: </b>${xData[point.index][1][point.index]}<br>
      //  <b>Percet Completion: </b>${xData[point.index][0][point.index]}%
      //  ` : ''}
      //  ${type == `enrollment` && xData[point.index] ? `<br><b>Completion: </b>${xData[point.index][1][point.index]}<br>
      //  <b>Percet Completion: </b>${xData[point.index][0][point.index]}%
      //  ` : ''}

      //  ${type == `percent_completion` && xData[point.index] ? `<br><b>Enrollment: </b>${xData[point.index][1][point.index]}<br>
      //  <b>Completion: </b>${xData[point.index][0][point.index]}
      //  ` : ''}
      //  `
      

      // obj = `<b>${level.charAt(0).toUpperCase() + level.substr(1).toLowerCase()} Name:</b> ${point.category.parent.name} 
      //        ${xData[point.index] ? `<br><b>Enrollment: </b>${xData[0][1][point.index]}<br><b>Completion: </b>${xData[0][2][point.index]}<br>
      //        <b>Percet Completion: </b>${xData[0][0][point.index]}%
      //        ` : ''}`

      let seriess = series.chart.series
      for(var i=0; i<seriess.length; i++) {
               
         obj = `<b>${level.charAt(0).toUpperCase() + level.substr(1).toLowerCase()} Name:</b> ${point.category.parent.name} 
                <br><b>${point.category.name}: </b>${point.options.y}<br>
             `;
    }

            return obj;

      }
    }
  }

}
