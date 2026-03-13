
import { Route, useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

export default function Intervention({route}: {route: Route<'Intervention', {  packageName: string }>} ) {
      const { packageName } = route.params;



    return (
        <>
            <Text>{packageName}</Text>
        </>
    );
}