import { useSearchParams } from "react-router-dom";
import Select from "./Select";

interface SortByProps {
  options: { value: string; label: string }[];
  name: string;
}

const SortBy: React.FC<SortByProps> = ({ options, name }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortBy = searchParams.get("sortBy") || "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      $type="white"
      name={name}
      value={currentSortBy}
      onChange={handleChange}
    />
  );
};

export default SortBy;
