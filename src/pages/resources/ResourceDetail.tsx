import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, Text, Loader, Title, Button, Group, Anchor, Image, Stack, SimpleGrid, Modal } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconArrowBack, IconX, IconExternalLink, IconInfoCircle, IconRocket, IconCalendarEvent } from '@tabler/icons-react'; 

const fetchLaunchDetail = async (id: string) => {
  const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
  if (!res.ok) {
    throw new Error('Error fetching launch details');
  }
  return res.json();
};

const ResourceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery(['launchDetail', id], () => fetchLaunchDetail(id));
  const [opened, setOpened] = useState(false); 
  const [selectedImage, setSelectedImage] = useState<string | null>(null); 
  const [currentSlide, setCurrentSlide] = useState(0); 

  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.links?.flickr?.original?.length) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % data.links.flickr.original.length);
      }
    }, 3000); 

    return () => clearInterval(interval);
  }, [data]);

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading details</div>;

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCloseClick = () => {
    navigate('/resources');
  };

  const openImageModal = (image: string) => {
    setSelectedImage(image);
    setOpened(true);
  };

  const closeImageModal = () => {
    setOpened(false);
    setSelectedImage(null);
  };

  return (
    <div className="resource-detail-container">
      <Card className="resource-detail-card" padding="lg" radius="md" shadow="sm">
        <Group position="apart" className="resource-detail-header">
          <Button variant="outline" onClick={handleBackClick} className="back-button">
            <IconArrowBack size={16} /> Back
          </Button>
          <Button variant="outline" onClick={handleCloseClick} className="close-button">
            <IconX size={16} /> Close
          </Button>
        </Group>
        <Title order={2} className="resource-detail-title">{data.name}</Title>
        <Text className="resource-detail-description">{data.details || 'No details available'}</Text>
        <Text className="resource-detail-date">
          <IconCalendarEvent size={16} /> Date: {new Date(data.date_utc).toLocaleDateString()}
        </Text>

        {data.links?.flickr?.original?.length > 0 ? (
          <Carousel
            slideSize="50%"
            slideGap="md"
            align="center"
            loop
            value={currentSlide}
            onChange={setCurrentSlide}
            withIndicators
            breakpoints={[{ maxWidth: 'sm', slideSize: '100%' }]}
          >
            {data.links.flickr.original.map((image: string, index: number) => (
              <Carousel.Slide key={index.toString()}>
                <Image
                  src={image}
                  alt={`${data.name} image ${index + 1}`}
                  height={300}
                  style={{ objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => openImageModal(image)}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        ) : (
          <Text>No images available</Text>
        )}

        <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <div className="resource-detail-images">
            {data.links?.patch && (
              <div className="patch-images">
                <Image
                  src={data.links.patch.large}
                  alt="Large Patch Image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Image
                  src={data.links.patch.small}
                  alt="Small Patch Image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}
          </div>

          <div className="resource-detail-links">
            <Text className="resource-detail-launchpad">
              <IconRocket size={16} /> Launchpad: {data.launchpad || 'Unknown'}
            </Text>
            <Text className="resource-detail-success">
              <IconInfoCircle size={16} /> Success: {data.success !== undefined ? (data.success ? 'Yes' : 'No') : 'Unknown'}
            </Text>
            {data.failures && data.failures.length > 0 && (
              <Text className="resource-detail-failure">
                Failure Reason: {data.failures[0].reason}
              </Text>
            )}
            {data.links.webcast && (
              <Text>
                <Anchor href={data.links.webcast} target="_blank" rel="noopener noreferrer">
                  <IconExternalLink size={16} /> Watch Webcast
                </Anchor>
              </Text>
            )}
            {data.links.article && (
              <Text>
                <Anchor href={data.links.article} target="_blank" rel="noopener noreferrer">
                  <IconExternalLink size={16} /> Read Article
                </Anchor>
              </Text>
            )}
            {data.links.wikipedia && (
              <Text>
                <Anchor href={data.links.wikipedia} target="_blank" rel="noopener noreferrer">
                  <IconExternalLink size={16} /> Wikipedia
                </Anchor>
              </Text>
            )}

            {/* Additional Data Section (moved here) */}
            <Stack spacing="xs" className="additional-data" mt="lg">
              <Text className="resource-detail-static-fire">
                Static Fire Date: {data.static_fire_date_utc ? new Date(data.static_fire_date_utc).toLocaleString() : 'N/A'}
              </Text>
              <Text className="resource-detail-flight-number">Flight Number: {data.flight_number}</Text>
              <Text className="resource-detail-rocket">Rocket ID: {data.rocket}</Text>
            </Stack>
          </div>
        </SimpleGrid>

        <Modal
          opened={opened}
          onClose={closeImageModal}
          title={data.name}
          size="lg"
          centered
          overlayOpacity={0.7}
          overlayColor="#000"
          styles={{
            modal: {
              height: '90vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
        >
          {selectedImage && (
            <Image src={selectedImage} alt="Selected Image" className="modal-image" />
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default ResourceDetail;
