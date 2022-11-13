(function () {
  var cashList = [];
  var count = 0;
  var total = 0;
  var startYear = 2017;
  var curYear = new Date().getFullYear();
  var years = [];
  for (var i = startYear; i <= curYear; i++) {
    years.push(i);
  }
  //   var years = [2021]

  for (var i = 0; i < years.length; i++) {
    var y = years[i];
    $.ajax({
      url: "/Cash/GetChargeList",
      type: "GET",
      data: {
        //   Page: 1,
        StartDate: y + ".01.01",
        EndDate: y + ".12.31",
      },
      dataType: "html",
      async: false,
      success: function (data) {
        var prices = $(data).find("td.list__price");
        var sum = 0;
        for (let j = 0; j < prices.length; j++) {
          sum += Number(prices[j].innerText.replace(/,/g, ""));
        }
        // console.log(sum)
        cashList[y] = sum;
        count += 1;
        total += sum;
      },
      error: function (xhr, status, error) {
        ajaxErrorHandler(xhr, status, error);
        return;
      },
    });
  }
  var interval = setInterval(function () {
    if (count >= years.length) {
      clearInterval(interval);
      window.alert(
        "현재까지 " +
          total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
          "원 사용하셨습니다"
      );
    }
  }, 500);
})();

// var years1 = [2017,2018,2019,2020,2021,2022,2023,2024,2025,2026];
// for (var j = 0; j < years.length; j++) {
//   $.ajax({
//     url: '/Cash/GetChargeList',
//     type: 'GET',
//     data: {
//       Page: 1,
//       StartDate: years[j] + '.01.01',
//       EndDate: years[j] + '.12.31',
//     },
//     dataType: 'html',
//     async: false,
//     success: function (data) {
//       var pageNum = $(data).find('.pagination__last')[0].getAttribute('onClick')
//       if (pageNum != null) {
//         lastNum = pageNum.replace(/[^0-9]/g, '')
//       }
//     },
//     error: function (xhr, status, error) {
//       ajaxErrorHandler(xhr, status, error)
//       return
//     },
//   })
//   for (var i = 1; i <= lastNum; i++) {
//     $.ajax({
//       url: '/Cash/GetChargeList',
//       type: 'GET',
//       data: {
//         Page: i,
//         StartDate: years[j] + '.01.01',
//         EndDate: years[j] + '.12.31',
//       },
//       dataType: 'html',
//       async: false,
//       success: function (data) {
//         $(data)
//           .find('td.list__price')
//           .each(function () {
//             var $cash = $(this)
//             cashList.push($cash.text().replace(/[^0-9]/g, ''))
//           })
//         $(data)
//           .find('td.list__date')
//           .each(function () {
//             var $cash = $(this)
//             chargeDateList.push($cash.text())
//           })
//         $(data)
//           .find('td.list__way')
//           .each(function () {
//             var $cash = $(this)
//             chargeWayList.push($cash.text())
//           })
//       },
//       error: function (xhr, status, error) {
//         ajaxErrorHandler(xhr, status, error)
//         return
//       },
//     })
//   }
// }

// ;(function (console) {
//   console.save = function (data, filename) {
//     if (!data) {
//       console.error('Console.save: No data')
//       return
//     }
//     if (!filename) filename = 'console.html'
//     if (typeof data === 'object') {
//       data = JSON.stringify(data, undefined, 4)
//     }
//     var blob = new Blob([data], { type: 'text/json' }),
//       e = document.createEvent('MouseEvents'),
//       a = document.createElement('a')

//     a.download = filename
//     a.href = window.URL.createObjectURL(blob)
//     a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
//     e.initMouseEvent(
//       'click',
//       true,
//       false,
//       window,
//       0,
//       0,
//       0,
//       0,
//       0,
//       false,
//       false,
//       false,
//       false,
//       0,
//       null
//     )
//     a.dispatchEvent(e)
//   }
// })(console)

// cashList.forEach(function (cash) {
//   sum += Number(cash)
// })
// for (var i = 0; i < cashList.length; i++) {
//   console.log(
//     chargeDateList[i] +
//       ' ' +
//       cashList[i].replace(regexp, ',') +
//       '원 ' +
//       chargeWayList[i]
//   )
//   text =
//     text +
//     '\n' +
//     chargeDateList[i] +
//     ' ' +
//     cashList[i].replace(regexp, ',') +
//     '원 ' +
//     chargeWayList[i]
// }

// sum = sum.toString().replace(regexp, ',')
// text = text + '\n' + '총합 : ' + sum
// console.log('현재까지 ' + sum + '원 사용하셨습니다')
// alert('현재까지 ' + sum + '원 사용하셨습니다')

// console.save(text, '로아현질내역.txt')
