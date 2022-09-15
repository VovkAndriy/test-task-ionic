import { gql, useApolloClient, useMutation } from "@apollo/client";
import { IonButton } from "@ionic/react";
import React, { useEffect, useState } from "react";
import SafeAreaView from "../components/atoms/SafeAreaView";
import "./Home.css";
import { Geolocation } from "@capacitor/geolocation";

type MutationSendLocationType = {
    id: string;
    location: {
        at: string;
        latLng: {};
    };
};

const TIMEOUT = 5000;

const SEND_LOCATION = gql`
    mutation userSave($input: UserUpdateInput!) {
        userSave(input: $input) {
            location {
                at
                accuracy
                geometry {
                    coordinates
                }
            }
        }
    }
`;

function makeid(length: number) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

export default function Home() {
    const [isSharing, setIsSharing] = useState(false);
    const [intervalId, setIntervalId] = useState<any>();
    const [mutateLocation, { loading, data, error }] =
        useMutation(SEND_LOCATION);
    const handleShareClick = async (
        e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
    ) => {
        if (!isSharing) {
            setIntervalId(
                setInterval(async () => {
                    const coordinates = await Geolocation.getCurrentPosition();
                    console.log("Coords: ", coordinates);
                    mutateLocation({
                        variables: {
                            input: {
                                id: "631f2329b2fcbfead8a5ba30",
                                location: {
                                    at: new Date().toISOString(),
                                    latLng: {
                                        lat: coordinates.coords.latitude,
                                        lng: coordinates.coords.longitude,
                                    },
                                },
                            },
                        },
                    });
                }, TIMEOUT)
            );
        } else {
            clearInterval(intervalId);
        }
        setIsSharing(!isSharing);
    };
    useEffect(() => {
        console.log("Resuult: ", data);
    }, [data]);
    return (
        <SafeAreaView>
            <div className="container">
                <h1>Hello there!</h1>
                <p>Press button below to share your geolocation</p>
                <IonButton
                    title="Share"
                    color={isSharing ? "warning" : "success"}
                    onClick={handleShareClick}>
                    {isSharing ? "Stop sharing" : "Share location"}
                </IonButton>
                {loading && <p>Currently loading!</p>}
                {data && !loading && <p>Success! Lat: {data.userSave.location.geometry.coordinates[0]}, Lng: {data.userSave.location.geometry.coordinates[1]}</p>}
                {error && (
                    <p style={{ color: "red" }}>Error: {error.message}</p>
                )}
            </div>
        </SafeAreaView>
    );
}
