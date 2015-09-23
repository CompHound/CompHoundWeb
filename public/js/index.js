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

$(document).ready(function() {
  $("div#datatable_wrapper > table#datatable > tbody > tr").live('click', function() {
    alert("You clicked my <tr>!");
    // get <td> element values
  });
});

$(document).ready(function() {
  $("div#datatable_wrapper > table#datatable > tbody > tr > td")
    .live('click', function() {
      alert("You clicked my <td>: " + $(this).html()
       + "... My TR is: " + $(this).parent("tr").html());
    }
  );
});
