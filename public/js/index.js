var columnNames = [
  "family",
  "symbol",
  "category",
  "level",
  "x",
  "y",
  "z",
  "easting",
  "northing",
  "properties",
  "project",
  "path",
  "urn",
  "_id"
];

function capitalize(s)
{
  var start = '_'==s[0] ? 1 : 0;
  return s[start].toUpperCase() + s.slice(start+1);
}

var columnDefinitions = columnNames.map(function(x) {
  return {data:x, defaultContent: ""};
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

$(document).ready(function() {

  $("div#datatable_wrapper > table#datatable > tbody > tr > td")
    .live('click', function() {

      var tr = $(this).parent("tr");
      var n = tr.find("td").length;

      //console.log(
      //  "You clicked TD: " + $(this).html()
      //  + "... its TR is: " + tr.html()
      //  + " and has " + n.toString() + " children");

      //var i = 0;
      //data = {};
      //tr.find("td").each(function() {
      //  data[columnNames[i++]] = $(this).text();
      //});

      var p = $("p#instance");
      p.text('Selected component occurrence:');
      p = p.next("p");
      if(p) { p.remove(); }
      var table = $("table#instance");
      table.empty();
      table.append('<colgroup><col class="twocolumn"><col class="twocolumn"></colgroup>');
      var i = 0;
      tr.find("td").each(function() {
        table.append('<tr><td>' + capitalize(columnNames[i++])
          + '</td><td>' + $(this).text() + '</td></tr>' );
      });
    });
});
