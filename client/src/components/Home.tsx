import { useState, useEffect } from "react";
import { IVolume } from "../interfaces";
import Header from "./Header";
import Volume from "./Volume";

const Home = () => {
    const [err, setErr] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [items, setItems] = useState<any>([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/volumes")
            .then(res => res.json())
            .then(result => {
                setIsLoaded(true);
                setItems(result);
            })
            .catch(err => {
                setIsLoaded(false);
                setErr(err);
            });
    }, []);

    if (err) {
        return (
            <div>
                <Header />
                <div>Error: {err.message}</div>
            </div>
        );
    } else if (!isLoaded) {
        return (
            <div>
                <Header />
                <div>Loading...</div>
            </div>
        );
    } else {
        const volumes: IVolume[] = items.map((item: IVolume, idx: number) => {
            return (
                <li key={idx}>
                    <Volume item={item} />
                </li>
            );
        });
        return (
            <div>
                <Header />
                <ul>{volumes}</ul>
            </div>
        );
    }
};

export default Home;
