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

var lmv_initialised = false;
var viewer = null;
var urn = id = '';

$(document).ready(
  function() {
    $("div#datatable_wrapper > table#datatable > tbody > tr > td").live('click',
      function() {

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
          var colname = columnNames[i++];
          var coltext = $(this).text();
          if( colname == 'urn') { urn = coltext; }
          else if( colname == 'id') { id = coltext; }

          table.append('<tr><td>'
            + capitalize(colname) + '</td><td>'
            + coltext + '</td></tr>' );
        });

        // Temporarily hardcoded urn and element id.

        var urn_rst_advanced_sample_project = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y29tcGhvdW5kLWJ1Y2tldC9yc3RfYWR2YW5jZWRfc2FtcGxlX3Byb2plY3QucnZ0';
        if( !urn ) { urn = urn_rst_advanced_sample_project; }
        if( !id ) { id = '4b50b624-3213-4043-a30c-ac2eba74ca69-00028301'; }

        if( !lmv_initialised && urn && id ) {
          $("p#viewer").remove();
          viewer = lmv_initialize( urn, id );
          lmv_initialised = true;
        }
      }
    );
  }
);

function isolate() {
  alert('Isolate.');
  if( lmv_initialised && viewer && urn && id ) {
    var nodeid = getNodeIdByGuid(id);
    viewer.isolate(nodeid);
  }
}
