import { IRestaurant } from "shared/interfaces/IRestaurant";
import { Card, Text } from "react-native-paper";
import { Image } from "react-native";

type RestaurantCardProps = Partial<IRestaurant>;

export function RestaurantCard({
        _id,
        nombre,
        direccion,
        logo
}: RestaurantCardProps) {
    return (
        <Card>
            <Card.Title title={nombre} />
            <Card.Content>
                <Image source={{ uri: logo }} style={{ height: 100, width: 100 }} />
                <Text>{direccion} ★</Text>
                <Text>{direccion}</Text>
            </Card.Content>
        </Card>
    );
}
