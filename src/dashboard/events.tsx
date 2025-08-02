import * as React from 'react';
import { type DataModel, type DataSource, DataSourceCache, List } from '@toolpad/core/Crud';


export interface Event extends DataModel {
  id: number;
  title: string;
  audience: string[];
}

let peopleStore: Event[] = [
  // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  // { id: 5, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  // { id: 6, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  // { id: 7, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const peopleDataSource: DataSource<Event> &
  Required<Pick<DataSource<Event>, 'getMany'>> = {
  fields: [
    { field: 'id', headerName: 'ID' },
    {
      field: 'title',
      headerName: 'Title',
    },
    {
      field: 'lastName',
      headerName: 'Last name',
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
    },
  ],
  getMany: async ({ paginationModel, filterModel, sortModel }) => {
    // Simulate loading delay
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });

    let processedPeople = [...peopleStore];

    // Apply filters (demo only)
    if (filterModel?.items?.length) {
      filterModel.items.forEach(({ field, value, operator }) => {
        if (!field || value == null) {
          return;
        }

        processedPeople = processedPeople.filter((person) => {
          const personValue = person[field];

          switch (operator) {
            case 'contains':
              return String(personValue)
                .toLowerCase()
                .includes(String(value).toLowerCase());
            case 'equals':
              return personValue === value;
            case 'startsWith':
              return String(personValue)
                .toLowerCase()
                .startsWith(String(value).toLowerCase());
            case 'endsWith':
              return String(personValue)
                .toLowerCase()
                .endsWith(String(value).toLowerCase());
            case '>':
              return (personValue as number) > value;
            case '<':
              return (personValue as number) < value;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    if (sortModel?.length) {
      processedPeople.sort((a, b) => {
        for (const { field, sort } of sortModel) {
          if ((a[field] as number) < (b[field] as number)) {
            return sort === 'asc' ? -1 : 1;
          }
          if ((a[field] as number) > (b[field] as number)) {
            return sort === 'asc' ? 1 : -1;
          }
        }
        return 0;
      });
    }

    // Apply pagination
    const start = paginationModel.page * paginationModel.pageSize;
    const end = start + paginationModel.pageSize;
    const paginatedPeople = processedPeople.slice(start, end);

    return {
      items: paginatedPeople,
      itemCount: processedPeople.length,
    };
  },
  deleteOne: async (personId) => {
    // Simulate loading delay
    await new Promise((resolve) => {
      setTimeout(resolve, 750);
    });

    peopleStore = peopleStore.filter((person) => person.id !== Number(personId));
  },
};

const peopleCache = new DataSourceCache();



export default function CrudList() {
  const handleRowClick = React.useCallback((personId: string | number) => {
    console.log(`Row click with id ${personId}`);
  }, []);

  const handleCreateClick = React.useCallback(() => {
    console.log('Create click');
  }, []);

  const handleEditClick = React.useCallback((personId: string | number) => {
    console.log(`Edit click with id ${personId}`);
  }, []);

  const handleDelete = React.useCallback((personId: string | number) => {
    console.log(`Person with id ${personId} deleted`);
  }, []);

  return (
    <List<Event>
      dataSource={peopleDataSource}
      dataSourceCache={peopleCache}
      initialPageSize={4}
      onRowClick={handleRowClick}
      onCreateClick={handleCreateClick}
      onEditClick={handleEditClick}
      onDelete={handleDelete}
    />

  );
}
