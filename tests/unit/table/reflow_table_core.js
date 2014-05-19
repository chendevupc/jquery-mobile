var addRowToTable = ( function() {
	var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
		letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i" ],
		count = 0;

	return function _addRowToTable( table ) {
		var dataSource = !!( count++ % 2 ) ? numbers : letters,
			newRow =
				"<tr>" +
					"<th data-test='abc'>" + dataSource[ 0 ] + "</th>" +
					"<td>" + dataSource[ 1 ] + "</td>" +
					"<td data-test='foo'>" + dataSource[ 2 ] + "</td>" +
					"<td data-col='3'>" + dataSource[ 3 ] + "</td>" +
					"<td>" + dataSource[ 4 ] + "</td>" +
				"</tr>";

		table
			.children( "tbody" )
				.empty()
				.append( newRow )
			.end()
			.table( "refresh" );
	};
})();

test( "The page should be enhanced correctly", function() {
	var table = $( "#table-reflow-test" ),
		firstHeaderCell = table.find( "thead tr th" ).first(),
		body = table.find( "tbody" ),
		bodyCells = body.find( "td" ),
		labels = bodyCells.find( "b.ui-table-cell-label" );

	deepEqual( table.hasClass( "ui-table-reflow" ), true,
		".ui-table-reflow class added to table element" );
	deepEqual( table.find( "tbody span.make-it-red" ).length, 2,
		"span was copied from table header" );

	deepEqual( !!labels, true, "Labels present" );
	deepEqual( labels.eq( 0 ).text(), "Movie Title", "Appropriate label placed" );

	addRowToTable( table );

	deepEqual( table.hasClass( "ui-table" ), true,
		"Table is still enhanced after refresh" );

	deepEqual( table.hasClass( "ui-table-reflow" ), true,
		"Table still has class 'ui-table-reflow' after refresh" );

	deepEqual( table.children( "tbody" ).find( "td" ).find( "b.ui-table-cell-label" ).length > 0,
		true, "Labels are added after refresh" );

	deepEqual( firstHeaderCell.jqmData( "cells" ).first().find( "b" ).length, 1,
		"Refreshing does not add more labels to a table cell" );
});

test( "Reflow refresh() updates table headers correctly", function() {
	var cellLookup,
		table = $( "#table-reflow-test" );
		firstHeaderCell = table.find( "thead tr th" ).first();

	addRowToTable( table );

	cellLookup = table.find( "tbody tr" ).first().find( "th, td" ).first().attr( "data-test" );

	deepEqual( table.hasClass( "ui-table" ), true, "Table remains enhanced after refresh()" );

	deepEqual( firstHeaderCell.jqmData( "cells" ).length > 0, true,
		"column cells still assigned to header cell" );

	deepEqual( firstHeaderCell.jqmData( "cells" ).eq( 0 ).closest( "table" ).attr( "id" ),
		"table-reflow-test", "Cell stored is a refreshed cell (currently in the table)" );

	deepEqual( cellLookup, firstHeaderCell.jqmData( "cells" ).first().attr( "data-test" ),
		"Cell stored in header is in the column of the respective header" );
});
