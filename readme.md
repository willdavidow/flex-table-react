# FlexTable

***Still WIP/Beta - no demo, tests

A small React component for creating flexible, responsive, data-driven table-like data displays.

This component is pretty stable and works great. With that being said: 

I wrote this library a few years ago and will be looking at ways to refine the code to be even more efficient and use less space.

## FlexTable Creation

Injecting data into FlexTable is relatively easy. When using a data object to define your FlexTable's content, you have the ability to:

- Define as many columns as you want
- Define whether or not they are sortable
- Apply a value (for sorting and styling purposes)
- Apply a value for rendering - if you want to display something different than the value being used for sorting/styling, then you can use the render key in both the header columns and all data rows.

The following relatively-simple data structure illustrates how to use FlexTable.

### Data Structure

```
{
    columns: {
        content: [ // header row
            { // header column
                value: 'place-name', // required
                render: 'Place Name', // optional, if you want to display complex output in the header cells or just display something different name vs the value
                sortable: true // optional, is the column sortable?
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

### Example Data-driven FlexTable

```
const flexTableData = {
  columns: {
    content: [
      {
        value: 'id',
        render: 'Person ID',
        sortable: true
      },
      {
        value: 'name',
        render: 'Person Name',
        sortable: true
      }
    ]
  },
  rows: {
    className: 'content-row-class',
    noDataMessage: 'Some message to display if there is no data.',
    content: [
      [
        {
          value: '1'
        },
        {
          value: 'Jonathan'
        }
      ],
      [
        {
          value: '2'
        },
        {
          value: 'Will'
        }
      ],
      [
        {
          value: '3'
        },
        {
          value: 'Archie'
        }
      ],
    ]
  }
};

<FlexTable 
  data={flexTableData} />  
```
