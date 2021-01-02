import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IVolume, IHighlight } from '../interfaces';
import { Center, Stack, Box, Text, Image } from '@chakra-ui/react';

const Volume = (props: any) => {
    const [item, setItem] = useState<IVolume>({
        id: '',
        title: '',
        author: '',
        category: '',
        image_url: '',
    });
    const [highlights, setHighlights] = useState<IHighlight[]>([]);

    const { id }: any = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/api/volumes/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setItem(res);
            })
            .catch((err) => {
                console.log(err);
            });
        fetch(`http://localhost:5000/api/highlights/volume/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setHighlights(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const { title, image_url } = item;
    const items = highlights.map((item: IHighlight) => {
        return (
            <Box
                mt={5}
                mb={5}
                p={5}
                shadow="md"
                borderWidth="1px"
                flex="1"
                borderRadius="md"
                maxW="500px"
            >
                <Text mt={4}>{item.highlight}</Text>
            </Box>
        );
    });
    return (
        <div>
            <Center mt={10}>
                <Stack>
                    <Image maxW="150px" src={image_url} />
                    <Text maxW="150px" as="kbd">
                        {title}
                    </Text>
                </Stack>
            </Center>
            <Center>
                <Stack>{items}</Stack>
            </Center>
        </div>
    );
};

export default Volume;
