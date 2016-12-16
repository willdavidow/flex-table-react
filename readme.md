# FlexTable

***Still WIP/Beta - no demo, tests or build/dist folder yet!***

A small set of React JS components for creating flexible, responsive, data-driven table-like data displays.

Take one of the following two approaches when using these components:

### Manual FlexTable Creation

Very similar to writing out standard HTML for a basic table..

Here's a simple two-column data table as an example:

```
<FlexTable className="data-display">

  <FlexTableRow className="data-display__row data-display__row-header">
  
    <FlexTableCell className="data-display__cell data-display__cell--header" data-col-name="id">
      <FlexTableContent>Id</FlexTableContent>
    </FlexTableCell>
    
    <FlexTableCell className="data-display__cell data-display__cell--header" data-col-name="name">
      <FlexTableContent>Name</FlexTableContent>
    </FlexTableCell>
    
  </FlexTableRow>
  
  <FlexTableRow className="data-display__row data-display__row">
  
    <FlexTableCell className="data-display__cell data-display__cell" data-col-name="id">
      <FlexTableContent>1</FlexTableContent>
    </FlexTableCell>
    
    <FlexTableCell className="data-display__cell data-display__cell" data-col-name="name">
      <FlexTableContent>Jonathan</FlexTableContent>
    </FlexTableCell>
    
  </FlexTableRow>
  
  <FlexTableRow className="data-display__row data-display__row">
  
    <FlexTableCell className="data-display__cell data-display__cell" data-col-name="id">
      <FlexTableContent>2</FlexTableContent>
    </FlexTableCell>
    
    <FlexTableCell className="data-display__cell data-display__cell" data-col-name="name">
      <FlexTableContent>Will</FlexTableContent>
    </FlexTableCell>
    
  </FlexTableRow>
  
  <FlexTableRow className="data-display__row data-display__row">
  
    <FlexTableCell className="data-display__cell data-display__cell" data-col-name="id">
      <FlexTableContent>3</FlexTableContent>
    </FlexTableCell>
    
    <FlexTableCell className="data-display__cell data-display__cell" data-col-name="name">
      <FlexTableContent>Archie</FlexTableContent>
    </FlexTableCell>
    
  </FlexTableRow>
</FlexTable>
```

### Data-driven FlexTable Creation

Injecting data into FlexTable is where it really shines. When using data to define your FlexTable's content, you have the ability to:

- Define as many columns as you want
- Define whether or not they are sortable
- Apply a value (for sorting and styling purposes)
- Apply a value for rendering - if you want to display something different than the value being used for sorting/styling, then you can use the render key in both the header columns and all data rows.

The following relatively-simple data structure illustrates what can be done using a data-driven FlexTable.

### Data Structure

```
{
    columns: {
        content: [ // header row
            { // header column
                sortable: true, // optional, is the column sortable?
                value: 'place-name', // required
                render: 'Place Name' // optional, if you want to display complex output in the header cells or just display something different name vs the value
            }
            // more header columns
        ]
    },
    rows: {
        className: 'string' or { or object }, // additional classes to add to rows (only content rows!), see classnames documentation for object className API
        noDataMessage: 'Sorry, no data...',
        content: [ // rows
            [   // single row, number of objects in each row needs to match number of columns
                {
                    value: number or 'string', // required
                    render: 'complex output' // value is required (for value comparisons) if using render
                }
            ],
            // more rows..
        ]
    }
}
```