var columnNames = [
  //"Id",
  //"Project",
  //"Path",
  //"Urn",
  "Family",
  "Symbol",
  "Category",
  "Level"
  //"X",
  //"Y",
  //"Z",
  //"Easting",
  //"Northing",
  //"Properties"
];

var columnDefinitions = columnNames.map(function(x) {
  return {data:x.toLowerCase(), defaultContent: ""};
});

$(document).ready(function() {
  $('#datatable').dataTable({
    processing: true,
    serverSide: true,
    ajax: { url: "/www/data" },
    columns: columnDefinitions,
    serverParams: function(data) { data.bChunkSearch = true; }
  });
  //.columnFilter();
});

// Support for selecting a row.
// http://stackoverflow.com/questions/3458571/jquery-click-event-on-tr-elements-with-in-a-table-and-getting-td-element-v

//$(document).ready(function() {
//  $("div#datatable_wrapper > table#datatable > tbody > tr").live('click', function() {
//    alert("You clicked my <tr>!");
//    // get <td> element values
//  });
//});

$(document).ready(function() {

/*
  var trh = $("div#datatable_wrapper > table#datatable > thead > tr");
  columnNames.map(function(x) {
    trh.append('<th>' + x + 'a</th>');
  });

  var trf = $("div#datatable_wrapper > table#datatable > tfoot > tr");
  columnNames.map(function(x) {
    trf.append('<th>' + x + 'b</th>');
  });
*/

  columnNames.map(function(x) {
    $("table#datatable tr#jeremy").append('<th>' + x + 'c</th>');
  });

  $("div#datatable_wrapper > table#datatable > tbody > tr > td")
    .live('click', function() {

      var tr = $(this).parent("tr");
      var n = tr.find("td").length;
      alert("You clicked my <td>: " + $(this).html()
        + "... My TR is: " + tr.html()
        + " and has " + n.toString() + " children");

      var i = 0;

      data = {};
      tr.find("td").each(function() {
        data[columnNames[i++]] = $(this).text();
      });
    });
});
