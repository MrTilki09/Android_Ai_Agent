
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { TouchableOpacity, Text } from 'react-native';

export default function DrawerButton() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();

    
    return (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} className="mr-3">
            <Text style={{ color: "white", fontSize: 24 }}>☰</Text>
        </TouchableOpacity>
    );
}