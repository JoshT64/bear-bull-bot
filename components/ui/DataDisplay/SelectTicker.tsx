import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select';

export const SelectTicker = () => {
  return (
    <>
      <Select defaultValue="SPY">
        <SelectTrigger defaultChecked>
          <SelectValue placeholder="SPY" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="NASDAQ">NASDAQ</SelectItem>
          <SelectItem value="SPY">SPY</SelectItem>
          <SelectItem value="DJI">DJI</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};
