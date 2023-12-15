import { useSearchParams } from "react-router-dom";
import Select from "./Select";

interface SortByProps {
  options: {
    value: string;
    label: string;
  }[];
}

const SortBy: React.FC<SortByProps> = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByValue = searchParams.get("sortBy") || "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      value={sortByValue}
      onChange={handleChange}
      type="white"
    />
  );
};

export default SortBy;
