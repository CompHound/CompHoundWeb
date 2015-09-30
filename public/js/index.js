var columns = [
Id
Project
Path
Urn
Family
Symbol
Category
Level
X
Y
Z
Easting
Northing
Properties

];

$(document).ready(function() {
  $('#datatable').dataTable({
    processing: true,
    serverSide: true,
    ajax: { url: "/www/data" },
    columns: [
      { data: "family", defaultContent: "" },
      { data: "symbol", defaultContent: "" }
    ],
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
  $("div#datatable_wrapper > table#datatable > tbody > tr > td")
    .live('click', function() {

      //var table = $(this).parent("table");
      //var columns = table.find("thead").find("tr").find("th").each(function() {
      //  return $(this).text();
      //});

      var tr = $(this).parent("tr");
      var n = tr.find("td").length;
      alert("You clicked my <td>: " + $(this).html()
        + "... My TR is: " + tr.html()
        + " and has " + n.toString() + " children");

      var columns = [];
      $(this).parent("table").find("th").each(function() {
        columns.push( $(this).text() );
      });

      columns = ["Family", "Symbol"];

      var i = 0;

      data = {};
      tr.find("td").each(function() {
        data[columns[i++]] = $(this).text();
      });

/*
      var row = tr.children().map( function(x) {
        return x.html();
      });

      data = row.reduce(function(result, field, index) {
        result[columns[index]] = field;
        return result;
      });
*/

      //React.render(
      //  <InstanceView data={data} />,
      //  document.getElementById('test-jreact-widget')
      //);

      //InstanceView.setState(data);
  });
});
