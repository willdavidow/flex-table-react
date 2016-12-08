

### Data Structure

```
{
    columns: {
        content: [
            {
                sortable: true, // optional, is the column sortable?
                value: 'place-name', // required
                render: 'Place Name' // optional, if you want to display complex output in the header cells or just display something different name vs the value
            }
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