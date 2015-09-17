$(document).ready(function() {
  $('#datatable').dataTable({
    processing: true,
    serverSide: true,
    ajax: { url: "data" },
    columns: [
      { data: "family", defaultContent: "" },
      { data: "symbol", defaultContent: "" }
    ],
    serverParams: function(data) { data.bChunkSearch = true; }
  });
  //.columnFilter();
});
