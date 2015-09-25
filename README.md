# CompHoundWeb

Cloud-based universal component and asset usage analysis, report and visualisation.

Node.js web server, mongo database and
[Autodesk View and Data API](https://developer.autodesk.com) viewer.

This project is based on and derived from the node.js mongodb web server for the FireRating in the Cloud sample, consisting of the
[FireRatingCloud](https://github.com/jeremytammik/FireRatingCloud) C# .NET REST API client Revit add-in and the
[fireratingdb](https://github.com/jeremytammik/firerating) Node.js mongoDB web server.

In addition to that, this project also sports a user interface, including
[Autodesk View and Data API](https://developer.autodesk.com) 2D and 3D model analysis, viewing and navigation functionality.

For more information, please refer to the
[CompHound project landing page](https://github.com/CompHound/CompHound.github.io),
[The 3D Web Coder](http://the3dwebcoder.typepad.com),
[The Building Coder](http://thebuildingcoder.typepad.com) and
the detailed articles describing the entire project implementation and evolution.


## Try it out Live

You can explore this app up and running live.

Here is the mongolab-hosted database that we are using:
[mongolab.com/databases/comphound](https://mongolab.com/databases/comphound).

It contains the collection of
[component instances](https://mongolab.com/databases/comphound/collections/instances).
The only occurrences that I exported so far are from the standard Revit sample file `rst_advanced_sample_project.rvt`.
You can add more yourself by running the
[CompHoundRvt](https://github.com/CompHound/CompHoundRvt) add-in in any other Revit BIM of your choice.

The node.js web server driving the database via mongoose is hosted on
[Heroku](https://dashboard.heroku.com), and its URL is
[https://comphound.herokuapp.com](https://comphound.herokuapp.com).

Its REST API is accessible via the route [/api/v1](https://comphound.herokuapp.com/api/v1).

[/api/v1/instances](https://comphound.herokuapp.com/api/v1/instances) should in theory returning all database entries, but it will fail with an application error due to too large data.

However, you can use [/api/v1/instances/:id](https://comphound.herokuapp.com/api/v1/instances/48891eaa-9041-405b-a10f-f06585de3cbb-0001de6d) to retrieve the JSON document for a single specific entry.

Finally, it sports the beginnings of a user interface that currently provides the following access points:

- [/](https://comphound.herokuapp.com) &ndash; say hello.
- [/hello/:message](https://comphound.herokuapp.com/hello/jeremy) &ndash; reply with the message passed in.
- [/html/count](https://comphound.herokuapp.com/html/count) &ndash; return the number of database entries.
- [/www/instances1](https://comphound.herokuapp.com/www/instances1) &ndash;  list all the database entries in a table &ndash; this can take a long time.
- [/datatable2](https://comphound.herokuapp.com/datatable2) &ndash; display a datatable navigation interface through the instance records.

In the long run, most of these access points can be shut down again.

Instead, one single main `index` entry point will display the datatable listing the component occurrences as well as provide access to the still missing reporting, viewing and model navigation functionality.



## Author

Jeremy Tammik,
[The Building Coder](http://thebuildingcoder.typepad.com) and
[The 3D Web Coder](http://the3dwebcoder.typepad.com),
[ADN](http://www.autodesk.com/adn)
[Open](http://www.autodesk.com/adnopen),
[Autodesk Inc.](http://www.autodesk.com)


## License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT).
Please see the [LICENSE](LICENSE) file for full details.
