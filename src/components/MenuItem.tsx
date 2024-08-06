import { MenuItem } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { formatCurrency } from '../utils/formatCurrency';

type Props = {
    menuItem: MenuItem;
    addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
    return (
        <Card className="cursor-pointer" onClick={addToCart}>
            <CardHeader>
                <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="font-bold">${formatCurrency(menuItem.price)}</CardContent>
        </Card>
    );
};

export default MenuItem;
