import { useState, useEffect } from 'react';
import { IVolume } from '../interfaces';
import { Link } from 'react-router-dom';
import {
    SimpleGrid,
    Image,
    Text,
    CircularProgress,
    Center,
    Stack,
} from '@chakra-ui/react';
import Header from './Header';

const Home = () => {
    const [err, setErr] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [items, setItems] = useState<any>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/volumes')
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setItems(result);
            })
            .catch((err) => {
                setIsLoaded(false);
                setErr(err);
            });
    }, []);

    if (err) {
        return (
            <div>
                <Header />
                <Center>
                    <Text as="kbd">Error: {err.message}</Text>
                </Center>
            </div>
        );
    } else if (!isLoaded) {
        return (
            <div>
                <Header />
                <Center>
                    <CircularProgress isIndeterminate color="blue.300" />
                </Center>
            </div>
        );
    } else {
        const filteredItems = items.filter(
            (item: IVolume) => item.category !== 'articles'
        );
        const volumes: IVolume[] = filteredItems.map((item: IVolume) => {
            const { image_url, title } = item;
            return (
                <Stack>
                    <Link to={`/volumes/${item.id}`}>
                        <Image
                            _hover={{
                                boxShadow:
                                    '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                            }}
                            maxW="150px"
                            src={image_url}
                        ></Image>
                    </Link>
                    <Text
                        maxWidth="150px"
                        noOfLines={3}
                        isTruncated={true}
                        as="kbd"
                    >
                        {title}
                    </Text>
                </Stack>
            );
        });
        return (
            <div>
                <Header />
                <Center>
                    <SimpleGrid
                        columns={[1, 2, 3, 5]}
                        mt={5}
                        spacingY={10}
                        spacingX={10}
                    >
                        {volumes}
                    </SimpleGrid>
                </Center>
            </div>
        );
    }
};

export default Home;
