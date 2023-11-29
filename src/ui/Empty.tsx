interface EmptyProps {
  resource: string;
}

const Empty: React.FC<EmptyProps> = ({ resource }) => {
  return <p>No {resource} could be found.</p>;
};

export default Empty;
