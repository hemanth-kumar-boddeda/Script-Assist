import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, Loader, Title, ScrollArea, TextInput, Select } from '@mantine/core';
import { Link } from 'react-router-dom';
import './Resources.scss'; // Import the SCSS file

// Fetch SpaceX launches from API
const fetchResources = async () => {
  const res = await fetch('https://api.spacexdata.com/v4/launches');
  if (!res.ok) {
    throw new Error('Error fetching resources');
  }
  return res.json();
};

const generateStars = () => {
  const stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push(
      <div
        key={i}
        className="star"
        style={{
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          width: `${Math.random() * 3}px`,
          height: `${Math.random() * 3}px`,
          animationDuration: `${Math.random() * 1 + 0.5}s`,
        }}
      />
    );
  }
  return stars;
};

const Resources = () => {
  const { data, error, isLoading } = useQuery(['resources'], fetchResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>('date');

  if (isLoading) return <Loader className="loader" />;
  if (error) return <div className="error">Error fetching resources</div>;

  // Filter resources based on search term
  const filteredResources = data.filter((launch: any) =>
    launch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort resources by date or name
  const sortedResources = filteredResources.sort((a: any, b: any) => {
    if (sortKey === 'date') {
      return new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime();
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="resources-container">
      {/* Background stars */}
      <div className="stars">{generateStars()}</div>
      <img src="https://2.bp.blogspot.com/-f4hCZ3i0rV0/Vy30KoMzRQI/AAAAAAAAUPc/rbwDFKEtwz4jj9LNjjFj9X9Wg8G4o8q-wCLcB/s1600/Moon%2Banimated%2Bgifs%2B8.gif" 
           alt="moon" 
           className="moon-image" 
      /> {/* Moon image */}

      {/* Title */}
      <Title order={2} className="resources-title">SpaceX Launches</Title>

      {/* Search and Sort Controls */}
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
          onChange={setSortKey}
          data={[
            { value: 'date', label: 'Date' },
            { value: 'name', label: 'Name' },
          ]}
          className="sort-select"
        />
      </div>

      {/* Table for displaying launches */}
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
                  <Link to={`/resources/${launch.id}`} className="details-link">View Details</Link>
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
