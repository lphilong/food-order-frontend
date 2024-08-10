import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Select, SelectTrigger, SelectValue } from '../ui/select';

const OrderDetailLoader = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-col gap-4 mb-3 animate-pulse">
                    <div>
                        Customer Name:
                        <span className="ml-2 font-normal bg-gray-300 h-6 w-1/2 rounded"></span>
                    </div>
                    <div>
                        Delivery address:
                        <span className="ml-2 font-normal bg-gray-300 h-6 w-3/4 rounded"></span>
                    </div>
                    <div>
                        Time:
                        <span className="ml-2 font-normal bg-gray-300 h-6 w-1/4 rounded"></span>
                    </div>
                    <div>
                        Total Cost:
                        <span className="ml-2 font-normal bg-gray-300 h-6 w-1/4 rounded"></span>
                    </div>
                </CardTitle>
                <Separator />
            </CardHeader>
            <CardContent className="flex flex-col gap-6 animate-pulse">
                <div className="flex flex-col gap-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <span key={index} className="flex items-center">
                            <Badge variant="outline" className="mr-2 bg-gray-300 h-6 w-6 rounded"></Badge>
                            <span className="bg-gray-300 h-6 w-1/2 rounded"></span>
                        </span>
                    ))}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="status">What is the status of this order?</Label>
                    <Select disabled>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Status" className="bg-gray-300 h-10 w-full rounded"></SelectValue>
                        </SelectTrigger>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderDetailLoader;
