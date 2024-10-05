// Resources.tsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, Loader, Title, ScrollArea, TextInput, Select } from '@mantine/core';
import './Resources.scss'; // Import the SCSS file specific to the Resources component

const fetchResources = async () => {
  const res = await fetch('https://api.spacexdata.com/v4/launches');
  if (!res.ok) {
    throw new Error('Error fetching resources');
  }
  return res.json();
};

const Resources = () => {
  const { data, error, isLoading } = useQuery(['resources'], fetchResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>('date'); // Allow sortKey to be string or null

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching resources</div>;

  // Filter resources based on search input
  const filteredResources = data.filter((launch: any) =>
    launch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort resources based on the selected sort key
  const sortedResources = filteredResources.sort((a: any, b: any) => {
    if (sortKey === 'date') {
      return new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime();
    }
    return a.name.localeCompare(b.name); // Sort by name
  });

  return (
    <div className="resources-container">
      <Title order={2} className="resources-title">SpaceX Launches</Title>
      <div className="resources-filters">
        <TextInput
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Select
          placeholder="Sort by"
          value={sortKey}
          onChange={setSortKey} // Now can accept string or null
          data={[
            { value: 'date', label: 'Date' },
            { value: 'name', label: 'Name' },
          ]}
          className="sort-select"
        />
      </div>
      <ScrollArea className="resources-scroll-area">
        <Table className="resources-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {sortedResources.map((launch: any) => (
              <tr key={launch.id}>
                <td>{launch.name}</td>
                <td>{new Date(launch.date_utc).toLocaleDateString()}</td>
                <td>
                  <a href={`/resources/${launch.id}`} className="details-link">View Details</a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default Resources;
